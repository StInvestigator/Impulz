import { useAppDispatch, useAppSelector } from "./redux.ts";
import { useKeycloak } from "@react-keycloak/web";
import {
    setSourceWithBuffer,
    setBufferLoading,
    setSourceHasMore,
    setPlaybackMode,
    addToPlaylist,
    insertNextInPlaylist,
    setPlaylist,
    setCurrentTrack,
    updateSourcePage,
    setBufferTracks,
    appendToPlaylist,
} from "../store/reducers/PlayerSlice.ts";
import type { TrackSimpleDto } from "../models/DTO/TrackSimpleDto.ts";
import type { PlayerSource } from "../store/reducers/PlayerSlice.ts";
import { useEffect, useRef, useCallback } from "react";

let sharedFetchFn: ((page: number, size: number) => Promise<TrackSimpleDto[]>) | null = null;
let sharedFetchSource: { type: PlayerSource["type"]; id: number } | null = null;
const pendingPageRef = { current: null as number | null };

export const usePlayTrack = () => {
    const dispatch = useAppDispatch();
    const { keycloak } = useKeycloak();
    const { playbackMode, source, playlist, currentTrackIndex, bufferTracks, isBufferLoading } =
        useAppSelector((state) => state.player);

    const currentFetchFnRef = useRef<((page: number, size: number) => Promise<TrackSimpleDto[]>) | null>(null);

    const requireAuth = () => {
        if (!keycloak?.authenticated) {
            keycloak?.login();
            return false;
        }
        return true;
    };

    const callWithTimeout = useCallback(<T,>(p: Promise<T>, ms = 10000): Promise<T> => {
        let timer: ReturnType<typeof setTimeout> | null = null;
        const timeout = new Promise<never>((_, rej) => {
            timer = setTimeout(() => rej(new Error(`fetch timeout ${ms}ms`)), ms);
        });
        return Promise.race([p, timeout]).finally(() => {
            if (timer !== null) {
                clearTimeout(timer);
            }
        }) as Promise<T>;
    }, []);

    const playSingle = (track: TrackSimpleDto, mode?: "replace" | "append" | "insertNext") => {
        if (!requireAuth()) return;
        const effectiveMode = mode || playbackMode;
        switch (effectiveMode) {
            case "append":
                dispatch(addToPlaylist([track]));
                break;
            case "insertNext":
                dispatch(insertNextInPlaylist([track]));
                break;
            case "replace":
            default:
                dispatch(setPlaylist([track]));
                dispatch(setCurrentTrack(0));
                break;
        }
    };

    const loadNextPageToBuffer = useCallback(
        async (
            sourceOverride?: PlayerSource,
            fetchFnOverride?: (page: number, size: number) => Promise<TrackSimpleDto[]>
        ): Promise<boolean> => {
            const actualSource = sourceOverride ?? source;
            const actualFetchFn = fetchFnOverride ?? sharedFetchFn;

            console.log("loadNextPageToBuffer invoked - pre-guard check", {
                actualSourcePresent: Boolean(actualSource),
                fetchFnPresent: Boolean(actualFetchFn),
                sharedFetchSource,
                isBufferLoading,
                sourcePage: actualSource?.page,
                sourceSize: actualSource?.size,
                pendingPage: pendingPageRef.current,
            });

            if (
                !actualSource ||
                !actualFetchFn ||
                !sharedFetchSource ||
                actualSource.type !== sharedFetchSource.type ||
                actualSource.id !== sharedFetchSource.id ||
                isBufferLoading
            ) {
                console.log("loadNextPageToBuffer aborted by guard", {
                    actualSource: actualSource
                        ? { page: actualSource.page, size: actualSource.size, id: actualSource.id, type: actualSource.type }
                        : null,
                    sharedFetchSource,
                    isBufferLoading,
                });
                return false;
            }

            const nextPage = actualSource.page + 1;

            if (typeof actualSource.totalPages === "number" && nextPage >= actualSource.totalPages) {
                dispatch(setSourceHasMore(false));
                return false;
            }

            if (pendingPageRef.current === nextPage) {
                console.log("loadNextPageToBuffer: page already pending, skipping", { nextPage });
                return false;
            }

            pendingPageRef.current = nextPage;
            console.log("Загрузка следующей страницы в буфер (before dispatch setBufferLoading):", {
                currentPage: actualSource.page,
                nextPage,
                pageSize: actualSource.size,
            });

            dispatch(setBufferLoading(true));
            try {
                const newTracks = await callWithTimeout(actualFetchFn(nextPage, actualSource.size), 10000);
                console.log("Буфер: загружены треки (from loadNextPageToBuffer)", {
                    page: nextPage,
                    loadedTracks: Array.isArray(newTracks) ? newTracks.length : typeof newTracks,
                    sample0: Array.isArray(newTracks) && newTracks[0] ? { id: newTracks[0].id, title: newTracks[0].title } : undefined,
                });

                if (Array.isArray(newTracks) && newTracks.length > 0) {
                    dispatch(setBufferTracks(newTracks));
                    const hasMore =
                        typeof actualSource.totalPages === "number"
                            ? nextPage + 1 < actualSource.totalPages
                            : newTracks.length === actualSource.size;
                    dispatch(setSourceHasMore(hasMore));
                    return true;
                } else {
                    dispatch(setSourceHasMore(false));
                    return false;
                }
            } catch (error) {
                console.error("Ошибка загрузки буфера (loadNextPageToBuffer):", error);
                dispatch(setSourceHasMore(false));
                return false;
            } finally {
                pendingPageRef.current = null;
                dispatch(setBufferLoading(false));
                console.log("loadNextPageToBuffer finished (finally) - bufferLoading set to false");
            }
        },
        [source, isBufferLoading, dispatch, callWithTimeout]
    );

    const appendBufferToPlaylist = useCallback((): boolean => {
        if (bufferTracks.length > 0) {
            console.log("Перемещение треков из буфера в плейлист:", bufferTracks.length);
            dispatch(appendToPlaylist(bufferTracks));
            dispatch(setBufferTracks([]));
            dispatch(updateSourcePage());
            return true;
        }
        return false;
    }, [bufferTracks, dispatch]);

    const playWithBuffering = async (
        initialTracks: TrackSimpleDto[],
        sourceConfig: Omit<PlayerSource, "page" | "hasMore" | "totalPages"> & { name?: string; totalPages?: number },
        fetchPageFn: (page: number, size: number) => Promise<TrackSimpleDto[]>,
        startIndex: number = 0
    ) => {
        if (!requireAuth()) return;

        currentFetchFnRef.current = fetchPageFn;
        sharedFetchFn = fetchPageFn;
        sharedFetchSource = { type: sourceConfig.type, id: sourceConfig.id };

        const newSource: PlayerSource = {
            ...sourceConfig,
            page: 0,
            hasMore: true,
            totalPages: sourceConfig.totalPages ?? Infinity,
        };

        dispatch(setSourceWithBuffer({ source: newSource, initialTracks, bufferTracks: [], startIndex }));
        void loadNextPageToBuffer(newSource, fetchPageFn);
    };

    const useAutoBuffer = () => {
        useEffect(() => {
            if (currentTrackIndex === -1 || playlist.length === 0) return;

            const tracksLeft = playlist.length - currentTrackIndex - 1;
            console.log("Автобуферизация - проверка условий:", {
                currentTrackIndex,
                playlistLength: playlist.length,
                tracksLeft,
                hasMore: source?.hasMore,
                isBufferLoading,
                bufferTracksCount: bufferTracks.length,
                sourceType: source?.type,
                sourcePage: source?.page,
            });

            const BUFFER_AHEAD = 1;
            const shouldLoadBuffer =
                tracksLeft <= BUFFER_AHEAD && source?.hasMore && !isBufferLoading && bufferTracks.length === 0;
            const shouldAppendBuffer = tracksLeft === 0 && bufferTracks.length > 0;

            console.log("Автобуферизация - решения:", { shouldLoadBuffer, shouldAppendBuffer });

            if (shouldLoadBuffer) {
                console.log("Автобуферизация: загружаем следующую страницу в буфер");
                void loadNextPageToBuffer();
            }
            if (shouldAppendBuffer) {
                console.log("Автобуферизация: перемещаем буфер в плейлист");
                const appended = appendBufferToPlaylist();
                if (appended && source?.hasMore) {
                    console.log("Автобуферизация: запускаем загрузку следующей страницы");
                    setTimeout(() => {
                        void loadNextPageToBuffer();
                    }, 300);
                }
            }
        }, [
            currentTrackIndex,
            playlist.length,
            bufferTracks.length,
            source?.hasMore,
            isBufferLoading,
            loadNextPageToBuffer,
            appendBufferToPlaylist,
        ]);
    };

    const playAuthorPopularTracks = async (
        authorId: number,
        authorName: string,
        fetchTracksFn: (page: number, size: number) => Promise<{ tracks: TrackSimpleDto[]; totalPages: number }>,
        initialTracks: TrackSimpleDto[] = [],
        pageSize: number = 3
    ) => {
        console.log("Начинаем воспроизведение автора:", { authorId, authorName, initialTracks: initialTracks.length, pageSize });

        let totalPages = Infinity;
        const first = await fetchTracksFn(0, pageSize);

        if (first && Array.isArray(first.tracks) && first.tracks.length > 0) {
            if (initialTracks.length === 0) initialTracks = first.tracks;
            totalPages = typeof first.totalPages === "number" ? first.totalPages : Infinity;
        }

        if (initialTracks.length > 0) {
            await playWithBuffering(
                initialTracks,
                { type: "author", id: authorId, name: authorName, size: pageSize, totalPages },
                async (page, size) => {
                    const res = await fetchTracksFn(page, size);
                    return res.tracks;
                }
            );
        }
    };

    const playAlbumTracks = async (
        albumId: number,
        albumName: string,
        fetchTracksFn: (page: number, size: number) => Promise<TrackSimpleDto[]>,
        initialTracks: TrackSimpleDto[] = [],
        pageSize: number = 20
    ) => {
        if (initialTracks.length === 0) {
            initialTracks = await fetchTracksFn(0, pageSize);
        }
        await playWithBuffering(initialTracks, { type: "album", id: albumId, name: albumName, size: pageSize }, fetchTracksFn);
    };

    useEffect(() => {
        if (!source) {
            sharedFetchFn = null;
            sharedFetchSource = null;
        } else if (sharedFetchSource && (source.type !== sharedFetchSource.type || source.id !== sharedFetchSource.id)) {
            sharedFetchFn = null;
            sharedFetchSource = null;
        }
    }, [source]);

    useEffect(() => {
        return () => {
            if (currentFetchFnRef.current && sharedFetchFn === currentFetchFnRef.current) {
                sharedFetchFn = null;
                sharedFetchSource = null;
            }
            currentFetchFnRef.current = null;
        };
    }, []);

    return {
        playSingle,
        playWithBuffering,
        loadNextPageToBuffer,
        appendBufferToPlaylist,
        playAuthorPopularTracks,
        playAlbumTracks,
        useAutoBuffer,
        setPlaybackMode: (mode: "replace" | "append") => dispatch(setPlaybackMode(mode)),
        currentMode: playbackMode,
        bufferState: { tracksCount: bufferTracks.length, isLoading: isBufferLoading, hasMore: source?.hasMore },
    };
};
