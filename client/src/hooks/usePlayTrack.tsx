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
    appendToPlaylist, playTrack,
} from "../store/reducers/PlayerSlice.ts";
import type { PlayerSource } from "../store/reducers/PlayerSlice.ts";
import { useEffect, useRef, useCallback } from "react";
import type {TrackSimpleDto} from "../models/DTO/track/TrackSimpleDto.ts";
import {fetchAuthorTracksPaged} from "../store/reducers/action-creators/player.ts";
import type {AlbumSimpleDto} from "../models/DTO/album/AlbumSimpleDto.ts";
import type {PlaylistDto} from "../models/PlaylistDto.ts";

let sharedFetchFn: ((page: number, size: number) => Promise<TrackSimpleDto[]>) | null = null;
let sharedFetchSource: { type: PlayerSource["type"]; id: string | number } | null = null;
const pendingPageRef = { current: null as number | null };

type PlayableEntity = TrackSimpleDto | AlbumSimpleDto | PlaylistDto;

export const usePlayTrack = () => {
    const dispatch = useAppDispatch();
    const { keycloak } = useKeycloak();
    const { playbackMode, source, playlist, currentTrackIndex, bufferTracks, isBufferLoading,active } =
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

        console.log('🎵 playSingle called:', {
            track: track.title,
            mode: effectiveMode,
            currentPlaylistLength: playlist.length,
            currentTrackIndex
        });

        switch (effectiveMode) {
            case "append":
                dispatch(addToPlaylist([track]));
                console.log('🎵 Track appended to playlist');
                break;
            case "insertNext":
                dispatch(insertNextInPlaylist([track]));
                console.log('🎵 Track inserted next');
                break;
            case "replace":
            default:
                dispatch(setPlaylist([track]));
                dispatch(setCurrentTrack(0));
                console.log('🎵 Playlist replaced with single track');
                break;
        }
    };

    const addTrackToQueue = (track: TrackSimpleDto) => {
        if (!requireAuth()) return;

        const isPlayerInitialized = active !== null;

        console.log('🎵 addTrackToQueue:', {
            track: track.title,
            isPlayerInitialized,
            currentActive: active?.title,
            playlistLength: playlist.length,
            sharedFetchFn: !!sharedFetchFn,
            sharedFetchSource: sharedFetchSource,
            currentSource: source
        });

        if (!isPlayerInitialized) {
            console.log('🎵 Плеер не инициализирован, начинаем воспроизведение');
            dispatch(setPlaylist([track]));
            dispatch(playTrack());
        } else {
            console.log('🎵 Плеер инициализирован, добавляем в конец очереди');
            dispatch(appendToPlaylist([track]));

            if (source && (!sharedFetchSource || source.type !== sharedFetchSource.type || source.id !== sharedFetchSource.id)) {
                console.log('🎵 Обновляем shared состояние для текущего источника');
                const restored = restoreSourceConnection();
                console.log('🎵 Результат восстановления в addTrackToQueue:', restored);
            }
        }
    };

    const addAlbumToQueue = async (album: AlbumSimpleDto) => {
        if (!requireAuth()) return;

        console.log('🎵 addAlbumToQueue:', {
            album: album.title,
            tracksCount: album.tracks?.length || 0,
            isPlayerInitialized: active !== null
        });

        const albumTracks = album.tracks || [];

        if (albumTracks.length === 0) {
            console.warn('🎵 Альбом не содержит треков');
            return;
        }

        console.log('🎵 Добавляем все треки альбома в очередь:', albumTracks.length);

        if (!active) {
            console.log('🎵 Начинаем воспроизведение альбома');
            dispatch(setPlaylist(albumTracks));
            dispatch(setCurrentTrack(0));
            dispatch(playTrack());
        } else {
            console.log('🎵 Добавляем альбом в конец очереди');
            dispatch(appendToPlaylist(albumTracks));
            resetSharedState();
        }
    };

    const addPlaylistToQueue = async (playlist: PlaylistDto) => {
        if (!requireAuth()) return;

        console.log('🎵 addPlaylistToQueue:', {
            playlist: playlist.title,
            tracksCount: playlist.tracks?.length || 0,
            isPlayerInitialized: active !== null
        });

        const playlistTracks = playlist.tracks || [];

        if (playlistTracks.length === 0) {
            console.warn('🎵 Плейлист не содержит треков');
            return;
        }

        console.log('🎵 Добавляем все треки плейлиста в очередь:', playlistTracks.length);

        if (!active) {
            console.log('🎵 Начинаем воспроизведение плейлиста');
            dispatch(setPlaylist(playlistTracks));
            dispatch(setCurrentTrack(0));
            dispatch(playTrack());
        } else {
            console.log('🎵 Добавляем плейлист в конец очереди');
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
            default:
                console.warn('🎵 Unknown entity type:', type);
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

            console.log('🎵 loadNextPageToBuffer проверка:', {
                actualSource: !!actualSource,
                actualFetchFn: !!actualFetchFn,
                sharedFetchSource,
                isBufferLoading,
                typesMatch: actualSource && sharedFetchSource
                    ? actualSource.type === sharedFetchSource.type && actualSource.id === sharedFetchSource.id
                    : false
            });

            if (
                !actualSource ||
                !actualFetchFn ||
                !sharedFetchSource ||
                actualSource.type !== sharedFetchSource.type ||
                actualSource.id !== sharedFetchSource.id ||
                isBufferLoading
            ) {
                console.log('🎵 loadNextPageToBuffer: условия не выполнены');
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
                console.log('🎵 Загружаем страницу', nextPage, 'для источника', actualSource.id);
                const newTracks = await callWithTimeout(actualFetchFn(nextPage, actualSource.size), 10000);

                if (Array.isArray(newTracks) && newTracks.length > 0) {
                    console.log('🎵 Загружены треки для буфера:', newTracks.length);
                    dispatch(setBufferTracks(newTracks));
                    const hasMore =
                        typeof actualSource.totalPages === "number"
                            ? nextPage + 1 < actualSource.totalPages
                            : newTracks.length === actualSource.size;
                    dispatch(setSourceHasMore(hasMore));
                    return true;
                } else {
                    console.log('🎵 Нет треков для загрузки в буфер');
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

            console.log('🎵 playWithBuffering: установили sharedFetchFn и sharedFetchSource', {
                type: sourceConfig.type,
                id: sourceConfig.id
            });
        }

        const newSource: PlayerSource = {
            ...sourceConfig,
            page: 0,
            hasMore: true,
            totalPages: sourceConfig.totalPages ?? Infinity,
        };

        console.log('🎵 playWithBuffering: устанавливаем плейлист без предзагрузки буфера');

        dispatch(setSourceWithBuffer({ source: newSource, initialTracks, bufferTracks: [], startIndex }));
    };

    const restoreSourceConnection = useCallback(() => {
        if (!source) {
            console.log('🎵 restoreSourceConnection: source отсутствует');
            return false;
        }

        console.log('🎵 Попытка восстановить соединение с источником:', {
            sourceType: source.type,
            sourceId: source.id,
            currentSharedSource: sharedFetchSource
        });

        switch (source.type) {
            case "author":
            { const authorFetchFn = async (page: number, size: number) => {
                console.log('🎵 Вызываем fetchAuthorTracksPaged для восстановления:', { authorId: source.id, page, size });
                const res = await fetchAuthorTracksPaged(source.id.toString(), page, size);
                console.log('🎵 Результат восстановления для автора:', { tracksCount: res.tracks.length });
                return res.tracks;
            };
                sharedFetchFn = authorFetchFn;
                sharedFetchSource = { type: source.type, id: source.id };
                currentFetchFnRef.current = authorFetchFn;
                console.log('🎵 Восстановлено соединение для автора', {
                    sourceType: source.type,
                    sourceId: source.id,
                    sharedFetchFn: !!sharedFetchFn,
                    sharedFetchSource
                });
                return true; }

            case "album":
                console.warn('🎵 Не удалось восстановить соединение для альбома - нужна исходная fetch функция');
                return false;

            default:
                console.warn('🎵 Неизвестный тип источника:', source.type);
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
                console.log('🎵 Источники не совпадают, пытаемся восстановить соединение');
                const restored = restoreSourceConnection();
                console.log('🎵 Результат восстановления:', restored);
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

            console.log('🎵 useAutoBuffer проверка:', {
                currentTrackIndex,
                playlistLength: playlist.length,
                tracksLeft,
                hasMore: source?.hasMore,
                isBufferLoading,
                bufferTracksCount: bufferTracks.length,
                shouldLoadBuffer,
                shouldAppendBuffer,
                sharedFetchFn: !!sharedFetchFn,
                sharedFetchSource: sharedFetchSource,
                isSourceMatching,
                sourceType: source?.type,
                sharedSourceType: sharedFetchSource?.type,
                sourceId: source?.id,
                sharedSourceId: sharedFetchSource?.id
            });

            if (shouldLoadBuffer) {
                console.log('🎵 Загружаем следующую страницу в буфер (осталось треков:', tracksLeft, ')');
                void loadNextPageToBuffer();
            }

            if (shouldAppendBuffer) {
                console.log('🎵 Добавляем буфер в плейлист (последний трек)');
                const appended = appendBufferToPlaylist();
                if (appended && source?.hasMore) {
                    console.log('🎵 Буфер добавлен, загружаем следующую страницу');
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
        pageSize: number = 3
    ) => {
        if (!requireAuth()) return;

        console.log('🎵 Начало playAuthorPopularTracks для автора:', authorId);

        try {
            console.log('🎵 Загружаем первую страницу треков...');
            const firstPage = await fetchAuthorTracksPaged(authorId, 0, pageSize);

            console.log('🎵 Ответ от API:', firstPage);

            if (firstPage && Array.isArray(firstPage.tracks) && firstPage.tracks.length > 0) {
                console.log('🎵 Загружены треки первой страницы:', firstPage.tracks.length);
                console.log('🎵 Устанавливаем плейлист БЕЗ предзагрузки буфера');

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
            } else {
                console.warn('🎵 Не удалось загрузить треки для автора', authorId);
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
        console.log('🎵 Shared state updated:', { type: sourceType, id: sourceId });
    }, []);

    return {
        playSingle,
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