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

export const usePlayTrack = () => {
    const dispatch = useAppDispatch();
    const { keycloak } = useKeycloak();
    const { playbackMode, source, playlist, currentTrackIndex, bufferTracks, isBufferLoading } = useAppSelector((state) => state.player);

    const currentFetchFnRef = useRef<((page: number, size: number) => Promise<TrackSimpleDto[]>) | null>(null);

    const requireAuth = () => {
        if (!keycloak?.authenticated) {
            keycloak?.login();
            return false;
        }
        return true;
    };

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

    const loadNextPageToBuffer = useCallback(async (): Promise<boolean> => {
        if (!source || !currentFetchFnRef.current || isBufferLoading) {
            return false;
        }

        const nextPage = source.page + 1;

        console.log('🔄 Загрузка следующей страницы в буфер:', {
            currentPage: source.page,
            nextPage: nextPage,
            pageSize: source.size
        });

        dispatch(setBufferLoading(true));

        try {
            const newTracks = await currentFetchFnRef.current(nextPage, source.size);

            console.log('📥 Буфер: загружены треки', {
                page: nextPage,
                loadedTracks: newTracks.length
            });

            if (newTracks.length > 0) {
                dispatch(setBufferTracks(newTracks));

                const hasMore = newTracks.length === source.size;
                dispatch(setSourceHasMore(hasMore));

                return true;
            } else {
                dispatch(setSourceHasMore(false));
                return false;
            }
        } catch (error) {
            console.error('❌ Ошибка загрузки буфера:', error);
            dispatch(setSourceHasMore(false));
            return false;
        } finally {
            dispatch(setBufferLoading(false));
        }
    }, [source, isBufferLoading, dispatch]);

    const appendBufferToPlaylist = useCallback((): boolean => {
        if (bufferTracks.length > 0) {
            console.log('📤 Перемещение треков из буфера в плейлист:', bufferTracks.length);
            dispatch(appendToPlaylist(bufferTracks));
            dispatch(setBufferTracks([]));
            dispatch(updateSourcePage());

            return true;
        }
        return false;
    }, [bufferTracks, dispatch]);

    const playWithBuffering = async (
        initialTracks: TrackSimpleDto[],
        sourceConfig: Omit<PlayerSource, 'page' | 'hasMore'> & { name?: string },
        fetchPageFn: (page: number, size: number) => Promise<TrackSimpleDto[]>,
        startIndex: number = 0
    ) => {
        if (!requireAuth()) return;

        currentFetchFnRef.current = fetchPageFn;

        const source: PlayerSource = {
            ...sourceConfig,
            page: 0,
            hasMore: true
        };

        dispatch(setSourceWithBuffer({
            source,
            initialTracks,
            bufferTracks: [],
            startIndex
        }));


        setTimeout(async () => {
            try {
                dispatch(setBufferLoading(true));
                const bufferTracksResult = await fetchPageFn(1, sourceConfig.size);

                if (bufferTracksResult.length > 0) {
                    dispatch(setBufferTracks(bufferTracksResult));
                    dispatch(setSourceHasMore(bufferTracksResult.length === sourceConfig.size));
                } else {
                    dispatch(setSourceHasMore(false));
                }
            } catch (error) {
                console.error('Фоновая загрузка буфера:', error);
                dispatch(setSourceHasMore(false));
            } finally {
                dispatch(setBufferLoading(false));
            }
        }, 1000);
    };

    const useAutoBuffer = () => {
        useEffect(() => {
            if (currentTrackIndex === -1 || playlist.length === 0) return;

            const tracksLeft = playlist.length - currentTrackIndex - 1;

            console.log('🔍 Автобуферизация - проверка условий:', {
                currentTrackIndex,
                playlistLength: playlist.length,
                tracksLeft,
                hasMore: source?.hasMore,
                isBufferLoading,
                bufferTracksCount: bufferTracks.length,
                sourceType: source?.type,
                sourcePage: source?.page
            });

            const shouldLoadBuffer = tracksLeft <= 2 &&
                source?.hasMore &&
                !isBufferLoading &&
                bufferTracks.length === 0;

            const shouldAppendBuffer = tracksLeft === 0 && bufferTracks.length > 0;

            console.log('🔍 Автобуферизация - решения:', {
                shouldLoadBuffer,
                shouldAppendBuffer
            });

            if (shouldLoadBuffer) {
                console.log('🚀 Автобуферизация: загружаем следующую страницу в буфер');
                loadNextPageToBuffer();
            }

            if (shouldAppendBuffer) {
                console.log('🔄 Автобуферизация: перемещаем буфер в плейлист');
                const appended = appendBufferToPlaylist();

                if (appended && source?.hasMore) {
                    console.log('📥 Автобуферизация: запускаем загрузку следующей страницы');
                    setTimeout(() => loadNextPageToBuffer(), 300);
                }
            }
        }, [currentTrackIndex, playlist.length, bufferTracks.length, source?.hasMore, isBufferLoading, loadNextPageToBuffer, appendBufferToPlaylist]);
    };

    const playAuthorPopularTracks = async (
        authorId: number,
        authorName: string,
        fetchTracksFn: (page: number, size: number) => Promise<TrackSimpleDto[]>,
        initialTracks: TrackSimpleDto[] = [],
        pageSize: number = 3
    ) => {
        console.log('🎵 Начинаем воспроизведение автора:', {
            authorId,
            authorName,
            initialTracks: initialTracks.length,
            pageSize
        });

        if (initialTracks.length === 0) {
            initialTracks = await fetchTracksFn(0, pageSize);
        }

        if (initialTracks.length > 0) {
            await playWithBuffering(initialTracks, {
                type: 'author',
                id: authorId,
                name: authorName,
                size: pageSize
            }, fetchTracksFn);
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

        await playWithBuffering(initialTracks, {
            type: 'album',
            id: albumId,
            name: albumName,
            size: pageSize
        }, fetchTracksFn);
    };

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
        bufferState: {
            tracksCount: bufferTracks.length,
            isLoading: isBufferLoading,
            hasMore: source?.hasMore
        }
    };
};