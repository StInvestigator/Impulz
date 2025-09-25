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

    // Исправление: предоставляем начальное значение
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
            console.log('❌ Загрузка буфера отменена:', {
                source: !!source,
                fetchFn: !!currentFetchFnRef.current,
                isBufferLoading
            });

            if (source && !currentFetchFnRef.current) {
                console.log('⚠️ FetchFn не установлен, но source есть. Возможно, нужно подождать...');
            }
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
                loadedTracks: newTracks.length,
                trackIds: newTracks.map(t => t.id)
            });

            if (newTracks.length > 0) {
                console.log('💾 Диспатчим setBufferTracks...');
                dispatch(setBufferTracks(newTracks));

                // Вместо store.getState() используем другой подход
                console.log('✅ setBufferTracks вызван с', newTracks.length, 'треками');

                const hasMore = newTracks.length === source.size;
                dispatch(setSourceHasMore(hasMore));
                console.log('🔮 Установлен hasMore:', hasMore);

                return true;
            } else {
                console.log('📭 Нет новых треков для буфера');
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

        // СНАЧАЛА устанавливаем fetchFn
        currentFetchFnRef.current = fetchPageFn;
        console.log('✅ Установлен currentFetchFnRef');

        const source: PlayerSource = {
            ...sourceConfig,
            page: 0,
            hasMore: true
        };

        // ПОТОМ устанавливаем источник и треки
        dispatch(setSourceWithBuffer({
            source,
            initialTracks,
            bufferTracks: [],
            startIndex
        }));

        console.log('🎵 Источник и плейлист установлены');
    };

    const useAutoBuffer = () => {
        // Эффект для отслеживания изменений буфера
        useEffect(() => {
            console.log('🟦 Буфер изменился:', bufferTracks.length, 'треков');
        }, [bufferTracks.length]);

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
                fetchFnSet: !!currentFetchFnRef.current
            });

            const shouldLoadBuffer = tracksLeft <= 2 &&
                source?.hasMore &&
                !isBufferLoading &&
                bufferTracks.length === 0 &&
                !!currentFetchFnRef.current;

            const shouldAppendBuffer = tracksLeft === 0 && bufferTracks.length > 0;

            console.log('🔍 Автобуферизация - решения:', {
                shouldLoadBuffer,
                shouldAppendBuffer,
                bufferNotEmpty: bufferTracks.length > 0,
                fetchFnAvailable: !!currentFetchFnRef.current
            });

            if (shouldLoadBuffer) {
                console.log('🚀 Автобуферизация: загружаем следующую страницу в буфер');
                // Добавляем небольшую задержку для надежности
                setTimeout(() => {
                    loadNextPageToBuffer().then(success => {
                        console.log('📤 Загрузка буфера завершена, успех:', success);
                    });
                }, 100);
            }

            if (shouldAppendBuffer) {
                console.log('🔄 Автобуферизация: перемещаем буфер в плейлист');
                if (bufferTracks.length > 0) {
                    const appended = appendBufferToPlaylist();
                    console.log('📤 Результат перемещения буфера:', appended);
                } else {
                    console.log('❌ Буфер пустой, нечего перемещать');
                }
            }
        }, [currentTrackIndex, playlist.length, bufferTracks.length, source?.hasMore, isBufferLoading, loadNextPageToBuffer, appendBufferToPlaylist]);
    };

    const playAuthorPopularTracks = async (
        authorId: number,
        authorName: string,
        fetchTracksFn: (page: number, size: number) => Promise<TrackSimpleDto[]>,
        initialTracks: TrackSimpleDto[] = [],
        pageSize: number = 3 // Убедитесь, что здесь 3
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