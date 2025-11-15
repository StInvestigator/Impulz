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
    appendToPlaylist, playTrack, setIsFromLink,
} from "../store/reducers/PlayerSlice.ts";
import type { PlayerSource } from "../store/reducers/PlayerSlice.ts";
import { useEffect, useRef, useCallback } from "react";
import type { TrackSimpleDto } from "../models/DTO/track/TrackSimpleDto.ts";
import { fetchAuthorTracksPaged } from "../store/reducers/action-creators/player.ts";
import type { AlbumSimpleDto } from "../models/DTO/album/AlbumSimpleDto.ts";
import type { PlaylistDto } from "../models/PlaylistDto.ts";
import {
    fetchTracksByAlbum,
    fetchTracksByPlaylist, fetchTrackSimpleById
} from "../store/reducers/action-creators/tracks.ts";

let sharedFetchFn: ((page: number, size: number) => Promise<TrackSimpleDto[]>) | null = null;
let sharedFetchSource: { type: PlayerSource["type"]; id: string | number } | null = null;
const pendingPageRef = { current: null as number | null };

type PlayableEntity = TrackSimpleDto | AlbumSimpleDto | PlaylistDto;

export const usePlayTrack = () => {
    const dispatch = useAppDispatch();
    const { keycloak } = useKeycloak();
    const { playbackMode, source, playlist, currentTrackIndex, bufferTracks, isBufferLoading, active } =
        useAppSelector((state) => state.player);

    const currentFetchFnRef = useRef<((page: number, size: number) => Promise<TrackSimpleDto[]>) | null>(null);

    const requireAuth = () => {
        if (!keycloak.authenticated) {
            keycloak.login();
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

    const playTrackById = async (trackId: number) => {
        if (!requireAuth()) {
            throw new Error("Not authenticated");
        }

        try {
            const result = await dispatch(fetchTrackSimpleById(trackId)).unwrap();

            if (result) {
                dispatch(setIsFromLink(true));
                playSingle(result, "replace");
            } else {
                throw new Error("Track not found");
            }
        } catch (error) {
            console.error('🎵 Error in playTrackById:', error);
            throw error;
        }
    };

    const addTrackToQueue = (track: TrackSimpleDto) => {
        if (!requireAuth()) return;

        const isPlayerInitialized = active !== null;

        if (!isPlayerInitialized) {
            dispatch(setPlaylist([track]));
            dispatch(playTrack());
        } else {
            dispatch(appendToPlaylist([track]));

            if (source && (!sharedFetchSource || source.type !== sharedFetchSource.type || source.id !== sharedFetchSource.id)) {
                restoreSourceConnection();
            }
        }
    };

    const addAlbumToQueue = async (album: AlbumSimpleDto) => {
        if (!requireAuth()) return;

        const albumTracks = album.tracks || [];

        if (albumTracks.length === 0) {
            return;
        }

        dispatch(fetchTracksByAlbum({ albumId: album.id }))

        if (!active) {
            dispatch(setPlaylist(albumTracks));
            dispatch(setCurrentTrack(0));
            dispatch(playTrack());
        } else {
            dispatch(appendToPlaylist(albumTracks));
            resetSharedState();
        }
    };

    const addPlaylistToQueue = async (playlist: PlaylistDto) => {
        if (!requireAuth()) return;

        const playlistTracks = playlist.tracks || [];

        if (playlistTracks.length === 0) {
            return;
        }

        dispatch(fetchTracksByPlaylist({ playlistId: playlist.id }))

        if (!active) {
            dispatch(setPlaylist(playlistTracks));
            dispatch(setCurrentTrack(0));
            dispatch(playTrack());
        } else {
            dispatch(appendToPlaylist(playlistTracks));
            resetSharedState();
        }
    };

    const addToQueue = (entity: PlayableEntity, type: 'track' | 'album' | 'playlist' = 'track') => {
        if (!requireAuth()) return;

        switch (type) {
            case 'track':
                addTrackToQueue(entity as TrackSimpleDto);
                break;
            case 'album':
                addAlbumToQueue(entity as AlbumSimpleDto);
                break;
            case 'playlist':
                addPlaylistToQueue(entity as PlaylistDto);
                break;
        }
    };

    const playTrackList = (tracks: TrackSimpleDto[], startIndex: number = 0) => {
        if (!requireAuth()) return;

        dispatch(setPlaylist(tracks));
        dispatch(setCurrentTrack(startIndex));
    };

    const loadNextPageToBuffer = useCallback(
        async (
            sourceOverride?: PlayerSource,
            fetchFnOverride?: (page: number, size: number) => Promise<TrackSimpleDto[]>
        ): Promise<boolean> => {
            const actualSource = sourceOverride ?? source;
            const actualFetchFn = fetchFnOverride ?? sharedFetchFn;

            if (
                !actualSource ||
                !actualFetchFn ||
                !sharedFetchSource ||
                actualSource.type !== sharedFetchSource.type ||
                actualSource.id !== sharedFetchSource.id ||
                isBufferLoading
            ) {
                return false;
            }

            const nextPage = actualSource.page + 1;

            if (typeof actualSource.totalPages === "number" && nextPage >= actualSource.totalPages) {
                dispatch(setSourceHasMore(false));
                return false;
            }

            if (pendingPageRef.current === nextPage) {
                return false;
            }

            pendingPageRef.current = nextPage;
            dispatch(setBufferLoading(true));

            try {
                const newTracks = await callWithTimeout(actualFetchFn(nextPage, actualSource.size), 10000);

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
                console.error("🎵 Ошибка загрузки буфера:", error);
                dispatch(setSourceHasMore(false));
                return false;
            } finally {
                pendingPageRef.current = null;
                dispatch(setBufferLoading(false));
            }
        },
        [source, isBufferLoading, dispatch, callWithTimeout]
    );

    const appendBufferToPlaylist = useCallback((): boolean => {
        if (bufferTracks.length > 0) {
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

        if (!sharedFetchFn || !sharedFetchSource ||
            sharedFetchSource.type !== sourceConfig.type ||
            sharedFetchSource.id !== sourceConfig.id) {

            currentFetchFnRef.current = fetchPageFn;
            sharedFetchFn = fetchPageFn;
            sharedFetchSource = { type: sourceConfig.type, id: sourceConfig.id };
        }

        const newSource: PlayerSource = {
            ...sourceConfig,
            page: 0,
            hasMore: true,
            totalPages: sourceConfig.totalPages ?? Infinity,
        };


        dispatch(setSourceWithBuffer({ source: newSource, initialTracks, bufferTracks: [], startIndex }));
    };

    const restoreSourceConnection = useCallback(() => {
        if (!source) {
            return false;
        }

        switch (source.type) {
            case "author":
                {
                    const authorFetchFn = async (page: number, size: number) => {
                        const res = await fetchAuthorTracksPaged(source.id.toString(), page, size);
                        return res.tracks;
                    };
                    sharedFetchFn = authorFetchFn;
                    sharedFetchSource = { type: source.type, id: source.id };
                    currentFetchFnRef.current = authorFetchFn;
                    return true;
                }

            case "album":
                return false;

            default:
                return false;
        }
    }, [source]);

    const useAutoBuffer = () => {
        useEffect(() => {
            if (currentTrackIndex === -1 || playlist.length === 0) return;

            const tracksLeft = playlist.length - currentTrackIndex - 1;
            const BUFFER_AHEAD = 1;

            const isSourceMatching =
                source &&
                sharedFetchSource &&
                source.type === sharedFetchSource.type &&
                source.id === sharedFetchSource.id;

            if (source && (!sharedFetchSource || !isSourceMatching)) {
                restoreSourceConnection();
            }

            const shouldLoadBuffer =
                tracksLeft <= BUFFER_AHEAD &&
                source?.hasMore &&
                !isBufferLoading &&
                bufferTracks.length === 0 &&
                sharedFetchFn &&
                sharedFetchSource &&
                isSourceMatching;

            const shouldAppendBuffer = tracksLeft === 0 && bufferTracks.length > 0;

            if (shouldLoadBuffer) {
                void loadNextPageToBuffer();
            }

            if (shouldAppendBuffer) {
                const appended = appendBufferToPlaylist();
                if (appended && source?.hasMore) {
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
            restoreSourceConnection,
        ]);
    };

    const playAuthorPopularTracks = async (
        authorId: string,
        authorName: string,
        pageSize: number = 10
    ) => {
        if (!requireAuth()) return;


        try {
            const firstPage = await fetchAuthorTracksPaged(authorId, 0, pageSize);


            if (firstPage && Array.isArray(firstPage.tracks) && firstPage.tracks.length > 0) {

                const fetchFn = async (page: number, size: number) => {
                    const res = await fetchAuthorTracksPaged(authorId, page, size);
                    return res.tracks;
                };

                currentFetchFnRef.current = fetchFn;
                sharedFetchFn = fetchFn;
                sharedFetchSource = { type: "author", id: authorId };

                await playWithBuffering(
                    firstPage.tracks,
                    {
                        type: "author",
                        id: authorId,
                        name: authorName,
                        size: pageSize,
                        totalPages: firstPage.totalPages
                    },
                    fetchFn
                );
            }
        } catch (e) {
            console.error('🎵 Ошибка загрузки треков автора:', e);
        }
    };

    const playAlbumTracks = async (
        albumId: number,
        albumName: string,
        fetchTracksFn: (page: number, size: number) => Promise<TrackSimpleDto[]>,
        initialTracks: TrackSimpleDto[] = [],
        pageSize: number = 20
    ) => {
        if (!requireAuth()) return;

        if (initialTracks.length === 0) {
            initialTracks = await fetchTracksFn(0, pageSize);
        }
        await playWithBuffering(initialTracks, { type: "album", id: albumId, name: albumName, size: pageSize }, fetchTracksFn);
    };

    useEffect(() => {
        return () => {
            if (currentFetchFnRef.current && sharedFetchFn === currentFetchFnRef.current) {
                sharedFetchFn = null;
                sharedFetchSource = null;
            }
            currentFetchFnRef.current = null;
        };
    }, []);

    const resetSharedState = useCallback(() => {
        sharedFetchFn = null;
        sharedFetchSource = null;
        currentFetchFnRef.current = null;
    }, []);

    const updateSharedState = useCallback((
        fetchFn: (page: number, size: number) => Promise<TrackSimpleDto[]>,
        sourceType: PlayerSource["type"],
        sourceId: string | number
    ) => {
        sharedFetchFn = fetchFn;
        sharedFetchSource = { type: sourceType, id: sourceId };
        currentFetchFnRef.current = fetchFn;
    }, []);

    return {
        playSingle,
        playTrackById,
        addToQueue,
        playTrackList,
        playWithBuffering,
        loadNextPageToBuffer,
        appendBufferToPlaylist,
        playAuthorPopularTracks,
        playAlbumTracks,
        useAutoBuffer,
        resetSharedState,
        updateSharedState,
        restoreSourceConnection,
        setPlaybackMode: (mode: "replace" | "append") => dispatch(setPlaybackMode(mode)),
        currentMode: playbackMode,
        bufferState: { tracksCount: bufferTracks.length, isLoading: isBufferLoading, hasMore: source?.hasMore },
    };
};