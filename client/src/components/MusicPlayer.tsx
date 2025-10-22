import React, { useEffect, useState, useRef, useCallback } from 'react';
import PreviousIcon from '../assets/player/PlayerPreviousIcon.svg';
import NextIcon from '../assets/player/PlayerNextIcon.svg';
import RandomTracksIcon from '../assets/player/PlayerRandomPlayingIcon.svg';
import PlayerPlayIcon from '../assets/player/PlayerPlayIcon.svg';
import PlayerVolumeOnIcon from '../assets/player/PlayerVolumeOnIcon.svg';
import PlayerVolumeOffIcon from '../assets/player/PlayerVolumeOffIcon.svg';
import PlayerToggleFullMode from '../assets/player/PlayerToggleFullMode.svg';
import HoverPlayerPlayIcon from '../assets/player/HoverPlayerPlayIcon.svg';
import PlayerPauseIcon from '../assets/player/PlayerPauseIcon.svg';
import PlayerAddToPlaylistIcon from '../assets/player/PlayerAddToPlaylistIcon.svg';
import HoverPlayerToggleFullMode from '../assets/player/HoverPlayerToggleFullMode.svg';
import HoverPlayerToggleOffFullModeIcon from '../assets/player/HoverPlayerToggleOffFullModeIcon.svg';
import PlayerToggleOffFullModeIcon from '../assets/player/PlayerToggleOffFullModeIcon.svg';
import HoverPlayerNextIcon from '../assets/player/HoverPlayerNextIcon.svg';
import HoverPlayerPreviousIcon from '../assets/player/HoverPlayerPreviousIcon.svg';
import HoverPlayerRandomPlaying from '../assets/player/HoverPlayerRandomPlaying.svg';
import HoverPlayerAddToPlaylistIcon from '../assets/player/HoverPlayerAddToPlaylistIcon.svg';
import HoverPlayerPauseIcon from '../assets/player/HoverPlayerPauseIcon.svg';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
    pauseTrack,
    playTrack,
    setCurrentTime,
    setDuration,
    setVolume,
    nextTrack,
    prevTrack,
    updateSourcePage,
    addToPlaylist,
    setSourceHasMore,
    setPlaybackMode,
} from '../store/reducers/PlayerSlice';
import TrackProgress from './TrackProgress';
import { $authApi } from '../http';
import keycloak from '../keycloak.ts';
import { fetchPopularTracksByAuthor, fetchTracksByAlbum } from '../store/reducers/action-creators/tracks.ts';
import { usePlayTrack } from '../hooks/usePlayTrack';
import { useNavigate } from "react-router-dom";
import type {TrackSimpleDto} from "../models/DTO/track/TrackSimpleDto.ts";
import {useTranslation} from "react-i18next";

interface PlaybackStats {
    trackId: number;
    currentTime: number;
    duration: number;
    userId: string;
    sessionId: string;
}

const generateSessionId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const playbackService = {
    sendPlaybackStats: async (stats: PlaybackStats): Promise<void> => {
        try {
            await $authApi.post('/tracks/playback', stats);
        } catch (error) {
            console.error('Ошибка отправки статистики прослушивания:', error);
        }
    },

    getStreamUrl: async (id: number): Promise<string> => {
        const response = await $authApi.get(`/music/link/${id}`);
        return response.data;
    },
};

interface MusicPlayerProps {
    onOpenFullScreen?: () => void;
    onCloseFullScreen?: () => void;
    isFullScreenMode?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ onOpenFullScreen,onCloseFullScreen,isFullScreenMode = false }) => {
    const {
        active,
        playlist,
        pause,
        currentTime,
        duration,
        volume,
        currentTrackIndex,
        source,
        bufferTracks
    } = useAppSelector((state) => state.player);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation("errors");

    const { useAutoBuffer, appendBufferToPlaylist, loadNextPageToBuffer } = usePlayTrack();
    useAutoBuffer();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const objectUrlRef = useRef<string | null>(null);
    const sessionIdRef = useRef<string>('');
    const hasSentPlayback = useRef<boolean>(false);
    const listenedTimeRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const isMountedRef = useRef<boolean>(true);

    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [previousVolume, setPreviousVolume] = useState<number>(volume);
    const isLastTrack = currentTrackIndex >= playlist.length - 1;
    const isFirstTrack = currentTrackIndex <= 0;
    const lastActiveIdRef = useRef<number | null>(null);

    const playlistRef = useRef(playlist);
    const currentTrackIndexRef = useRef(currentTrackIndex);

    useEffect(() => {
        playlistRef.current = playlist;
        currentTrackIndexRef.current = currentTrackIndex;
    }, [playlist, currentTrackIndex]);

    useEffect(() => {
        const savedVolume = localStorage.getItem('playerVolume');
        if (savedVolume) {
            const volumeValue = parseInt(savedVolume, 10);
            if (!isNaN(volumeValue)) dispatch(setVolume(volumeValue));
        }

        const savedMode = localStorage.getItem('playerPlaybackMode') as "replace" | "append";
        if (savedMode && (savedMode === "replace" || savedMode === "append")) {
            dispatch(setPlaybackMode(savedMode));
        }
    }, [dispatch]);

    useEffect(() => {
        if (volume === 0 && !isMuted) {
            setIsMuted(true);
        } else if (volume > 0 && isMuted) {
            setIsMuted(false);
        }
    }, [volume, isMuted]);

    const toggleMute = () => {
        if (isMuted) {
            dispatch(setVolume(previousVolume));
            if (audioRef.current) {
                audioRef.current.volume = previousVolume / 100;
            }
            setIsMuted(false);
        } else {
            setPreviousVolume(volume);
            dispatch(setVolume(0));
            if (audioRef.current) {
                audioRef.current.volume = 0;
            }
            setIsMuted(true);
        }
    };

    const sendPlaybackStats = useCallback(async () => {
        if (hasSentPlayback.current || !active || !keycloak?.authenticated) return;

        const audio = audioRef.current;
        if (!audio) return;

        const userId =
            keycloak.tokenParsed?.sub ||
            keycloak?.subject ||
            keycloak.idTokenParsed?.sub ||
            'unknown-user';

        const stats: PlaybackStats = {
            trackId: active.id,
            currentTime: Math.min(audio.currentTime, duration),
            duration,
            userId,
            sessionId: sessionIdRef.current,
        };

        try {
            await playbackService.sendPlaybackStats(stats);
            hasSentPlayback.current = true;
        } catch (err) {
            console.error('Ошибка отправки статистики:', err);
        }
    }, [active, duration]);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
                audioRef.current = null;
            }
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!active) {
            setLoading(false);
            setError(null);
            return;
        }

        const activeTrackChanged = lastActiveIdRef.current !== active.id;
        lastActiveIdRef.current = active.id;

        const isOnlyPlaylistChanged =
            !activeTrackChanged &&
            audioRef.current &&
            objectUrlRef.current;

        if (isOnlyPlaylistChanged) {
            console.log('🎵 Изменился только плейлист, не пересоздаем аудио');
            return;
        }

        if (activeTrackChanged && audioRef.current) {
            console.log('🎵 Активный трек изменился, очищаем предыдущее аудио');
            audioRef.current.pause();
            audioRef.current.src = '';
            audioRef.current.onloadedmetadata = null;
            audioRef.current.oncanplay = null;
            audioRef.current.ontimeupdate = null;
            audioRef.current.onended = null;
            audioRef.current.onerror = null;
            audioRef.current.onplay = null;
            audioRef.current.onpause = null;
            audioRef.current = null;

            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = null;
            }
        }

        let mounted = true;
        sessionIdRef.current = generateSessionId();
        hasSentPlayback.current = false;
        listenedTimeRef.current = 0;
        lastTimeRef.current = 0;

        const loadStream = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = await playbackService.getStreamUrl(active.id);
                if (!mounted || !isMountedRef.current) return;

                if (!url) {
                    setError('Не удалось загрузить аудиопоток');
                    setLoading(false);
                    return;
                }

                if (audioRef.current && objectUrlRef.current === url) {
                    console.log('🎵 Аудио уже загружено с этим URL, продолжаем воспроизведение');
                    setLoading(false);
                    if (!pause && audioRef.current.paused) {
                        audioRef.current.play().catch(console.error);
                    }
                    return;
                }

                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.src = '';
                    audioRef.current.onloadedmetadata = null;
                    audioRef.current.oncanplay = null;
                    audioRef.current.ontimeupdate = null;
                    audioRef.current.onended = null;
                    audioRef.current.onerror = null;
                }

                if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

                objectUrlRef.current = url;
                const audio = new Audio();
                audio.volume = volume / 100;
                audioRef.current = audio;

                audio.onloadedmetadata = () => {
                    const checkDuration = setInterval(() => {
                        if (!isNaN(audio.duration) && isFinite(audio.duration)) {
                            clearInterval(checkDuration);
                            dispatch(setDuration(audio.duration));
                        }
                    }, 100);
                };

                audio.oncanplay = () => {
                    if (!mounted || !isMountedRef.current) return;
                    setLoading(false);

                    audio.play().catch((err) => {
                        console.error('Ошибка автовоспроизведения:', err);
                        setError('Ошибка воспроизведения аудио');
                    });
                };

                audio.onplay = () => {
                    if (!mounted || !isMountedRef.current) return;
                    dispatch(playTrack());
                };

                audio.onpause = () => {
                    if (!mounted || !isMountedRef.current) return;
                    dispatch(pauseTrack());
                };

                audio.onerror = (e) => {
                    if (!mounted || !isMountedRef.current) return;
                    console.error('Audio error:', e);
                    setError('Ошибка загрузки аудио');
                    setLoading(false);
                };

                audio.ontimeupdate = () => {
                    if (!mounted || !isMountedRef.current) return;
                    const cur = Math.floor(audio.currentTime);
                    if (Math.floor(currentTime) !== cur) {
                        dispatch(setCurrentTime(cur));
                    }

                    if (!audio.paused) {
                        const delta = cur - lastTimeRef.current;
                        if (delta > 0 && delta < 5) listenedTimeRef.current += delta;
                    }
                    lastTimeRef.current = cur;

                    if (listenedTimeRef.current >= 30) sendPlaybackStats();
                };

                audio.onended = async () => {
                    const currentPlaylist = playlistRef.current;
                    const currentIndex = currentTrackIndexRef.current;
                    const isLastTrack = currentIndex >= currentPlaylist.length - 1;

                    console.log('Трек завершен:', {
                        isLastTrack,
                        currentTrackIndex: currentIndex,
                        playlistLength: currentPlaylist.length,
                        hasMore: source?.hasMore,
                        bufferTracksCount: bufferTracks.length
                    });

                    if (!isLastTrack) {
                        dispatch(nextTrack());
                        return;
                    }

                    const bufferAppended = appendBufferToPlaylist();

                    if (bufferAppended) {
                        console.log('Буфер перемещен, переходим к следующему треку');
                        dispatch(nextTrack());

                        if (source?.hasMore) {
                            console.log('Запускаем загрузку следующей страницы буфера');
                            setTimeout(() => loadNextPageToBuffer(), 500);
                        }
                    } else if (source?.hasMore) {
                        console.log('Буфер пуст, загружаем следующую страницу напрямую');

                        const nextPage = (source.page || 0) + 1;

                        try {
                            let fetchResult;

                            switch (source.type) {
                                case "author":
                                    fetchResult = await dispatch(fetchPopularTracksByAuthor({
                                        authorId: source.id.toString(),
                                        page: nextPage,
                                        size: source.size
                                    }));
                                    break;
                                case "album":
                                    fetchResult = await dispatch(fetchTracksByAlbum({
                                        albumId: source.id,
                                        page: nextPage,
                                        size: source.size
                                    }));
                                    break;
                                default:
                                    return;
                            }

                            const payload = (fetchResult as { payload?: TrackSimpleDto[] })?.payload;
                            const newTracks: TrackSimpleDto[] = payload ?? [];

                            if (newTracks.length > 0) {
                                console.log('Загружены новые треки:', newTracks.length);
                                dispatch(addToPlaylist(newTracks));
                                dispatch(updateSourcePage());
                                dispatch(nextTrack());

                                if (newTracks.length < source.size) {
                                    dispatch(setSourceHasMore(false));
                                }
                            } else {
                                console.log('Нет новых треков, останавливаем воспроизведение');
                                dispatch(setSourceHasMore(false));
                            }
                        } catch (error) {
                            console.error('Ошибка загрузки треков:', error);
                            dispatch(setSourceHasMore(false));
                        }
                    }
                };

                audio.src = url;
                audio.load();
            } catch (err) {
                if (!mounted || !isMountedRef.current) return;
                console.error('Load stream error:', err);
                setError(t("error-track-loading"));
                setLoading(false);
            }
        };

        loadStream();
        return () => { mounted = false; };
    }, [active?.id]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume / 100;
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (pause && !audio.paused) audio.pause();
        else if (!pause && audio.paused && audio.readyState >= 2) audio.play().catch(err => {
            console.error('Play error:', err);
            setError('Ошибка воспроизведения');
        });
    }, [pause]);

    const togglePlay = () => {
        if (loading) return;
        if (pause) dispatch(playTrack());
        else dispatch(pauseTrack());
    };

    const handleNext = async () => {
        if (!isLastTrack) {
            dispatch(nextTrack());
        } else {
            const bufferAppended = appendBufferToPlaylist();

            if (bufferAppended) {
                dispatch(nextTrack());
                if (source?.hasMore) {
                    setTimeout(() => loadNextPageToBuffer(), 500);
                }
            } else if (source?.hasMore) {
                const nextPage = (source.page ?? 0) + 1;
                let fetchResult;

                switch (source.type) {
                    case "author":
                        fetchResult = await dispatch(fetchPopularTracksByAuthor({
                            authorId: source.id.toString(),
                            page: nextPage,
                            size: source.size
                        }));
                        break;
                    case "album":
                        fetchResult = await dispatch(fetchTracksByAlbum({
                            albumId: source.id,
                            page: nextPage,
                            size: source.size
                        }));
                        break;
                    default:
                        return;
                }

                const payload = (fetchResult as { payload?: TrackSimpleDto[] })?.payload;
                const newTracks: TrackSimpleDto[] = payload ?? [];

                if (newTracks.length > 0) {
                    dispatch(addToPlaylist(newTracks));
                    dispatch(updateSourcePage());
                    dispatch(nextTrack());
                } else {
                    dispatch(setSourceHasMore(false));
                }
            } else {
                dispatch(pauseTrack());
            }
        }
    };

    const handlePrev = () => {
        if (!isFirstTrack) dispatch(prevTrack());
    };

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        dispatch(setVolume(newVolume));
        localStorage.setItem('playerVolume', newVolume.toString());
    };

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) {
            console.log('🎵 Audio ref is null in changeCurrentTime');
            return;
        }
        const newTime = Number(e.target.value);
        console.log('🎵 Changing time from', currentTime, 'to', newTime, 'duration:', duration);

        audioRef.current.currentTime = newTime;
        dispatch(setCurrentTime(newTime));
        lastTimeRef.current = newTime;
    };

    const handleFullScreenToggle = () => {
        if (isFullScreenMode) {
            if (onCloseFullScreen) {
                onCloseFullScreen();
            }
        } else {
            if (onOpenFullScreen) {
                onOpenFullScreen();
            }
        }
    };

    if (!active) return null;

    const handleAuthorClick = () => {
        if (active.authors?.[0]?.id) {
            navigate(`/author/${active.authors[0].id}`);
        }
    };

    const handleAlbumClick = () => {
        if (active.albumId) {
            navigate(`/album/${active.albumId}`);
        }
    };

    return (
        <>
            {/* Основной плеер */}
            <Box
                height="80px"
                width="100%"
                position="fixed"
                bottom={0}
                left={0}
                display="flex"
                alignItems="center"
                padding="0 20px"
                bgcolor="var(--dark-purple)"
                boxSizing="border-box"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                    boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
                }}
            >
                {/* Левая секция */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    minWidth: 200
                }}>
                    {/* Кнопка перемешивания */}
                    <IconButton
                        disableRipple
                        sx={{
                            color: '#ff6b35'
                        }}
                    >
                        <Box
                            component="img"
                            src={RandomTracksIcon}
                            sx={{
                                width: 20,
                                height: 20,
                                '&:hover': {
                                    content: `url(${HoverPlayerRandomPlaying})`
                                }
                            }}
                        />
                    </IconButton>

                    {/* Кнопка предыдущий трек */}
                    <IconButton
                        disableRipple
                        onClick={handlePrev}
                        disabled={isFirstTrack}
                        sx={{
                            color: '#ff6b35',
                        }}
                    >
                        <Box
                            component="img"
                            src={PreviousIcon}
                            sx={{
                                width: 28,
                                height: 28,
                                opacity: isFirstTrack ? 0.3 : 1,
                                transition: 'opacity 0.2s ease',
                                '&:hover': {
                                    content: `url(${HoverPlayerPreviousIcon})`
                                }
                            }}
                        />
                    </IconButton>

                    {/* Кнопка play/pause */}
                    {loading ? (
                        <Box sx={{ padding: '8px' }}>
                            <CircularProgress size={24} sx={{ color: '#ff6b35' }} />
                        </Box>
                    ) : (
                        <IconButton
                            disableRipple
                            onClick={togglePlay}
                            sx={{
                                color: '#ff6b35',
                                fontSize: '32px',
                            }}
                        >
                            {pause ? (
                                <Box
                                    component="img"
                                    src={PlayerPlayIcon}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        transition: 'opacity 0.2s ease',
                                        '&:hover': {
                                            content: `url(${HoverPlayerPlayIcon})`
                                        }
                                    }}
                                />
                            ) : (
                                <Box
                                    component="img"
                                    src={PlayerPauseIcon}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        transition: 'opacity 0.2s ease',
                                        '&:hover': {
                                            content: `url(${HoverPlayerPauseIcon})`
                                        }
                                    }}
                                />
                            )}
                        </IconButton>
                    )}

                    {/* Кнопка следующий трек */}
                    <IconButton
                        disableRipple
                        onClick={handleNext}
                        disabled={isLastTrack && !source?.hasMore}
                        sx={{
                            color: '#ff6b35',
                            '&:disabled': { color: 'rgba(255, 255, 255, 0.3)' }
                        }}
                    >
                        <Box
                            component="img"
                            src={NextIcon}
                            sx={{
                                width: 28,
                                height: 28,
                                opacity: isLastTrack ? 0.3 : 1,
                                transition: 'opacity 0.2s ease',
                                '&:hover': {
                                    content: `url(${HoverPlayerNextIcon})`
                                }
                            }}
                        />
                    </IconButton>
                </Box>

                {/* Информация о треке */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: "15px",
                    position: 'absolute',
                    left: '292px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    maxWidth: 'calc(50% - 300px)',
                    minWidth: '300px',
                    zIndex: 1
                }}>
                    {/* Обложка трека */}
                    <Box sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '8px',
                        background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        flexShrink: 0
                    }}>
                        {active.imgUrl ? (
                            <Box
                                component="img"
                                src={active.imgUrl}
                                alt="Track cover"
                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <Box sx={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                                🎵
                            </Box>
                        )}
                    </Box>

                    <Box sx={{
                        flex: 1,
                        minWidth: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <Box sx={{
                            flex: 1,
                            minWidth: 0
                        }}>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    marginBottom: '4px'
                                }}
                            >
                                {active.title ?? 'Unknown title'}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                                <Typography
                                    onClick={handleAuthorClick}
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '12px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: active.authors?.[0]?.id ? 'pointer' : 'default',
                                        '&:hover': active.authors?.[0]?.id ? {
                                            color: '#ff6b35',
                                            textDecoration: 'underline'
                                        } : {},
                                        flexShrink: 1,
                                        minWidth: 0
                                    }}
                                >
                                    {active.authors?.map(author => author.name).join(', ') || 'Unknown artist'}
                                </Typography>

                                <Box sx={{
                                    width: '2px',
                                    height: '2px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    flexShrink: 0
                                }} />

                                <Typography
                                    onClick={handleAlbumClick}
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '12px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        cursor: active.albumId ? 'pointer' : 'default',
                                        '&:hover': active.albumId ? {
                                            color: '#ff6b35',
                                            textDecoration: 'underline',
                                        } : {},
                                        flexShrink: 1,
                                        minWidth: 0
                                    }}
                                >
                                    {active.album ?? 'Unknown album'}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Кнопка добавления в плейлист */}
                        <IconButton
                            disableRipple
                            sx={{
                                color: '#ff6b35',
                                flexShrink: 0
                            }}
                        >
                            <Box
                                component="img"
                                src={PlayerAddToPlaylistIcon}
                                sx={{
                                    width: 20,
                                    height: 20,
                                    '&:hover': {
                                        content: `url(${HoverPlayerAddToPlaylistIcon})`
                                    }
                                }}
                            />
                        </IconButton>
                    </Box>
                </Box>

                {/* Отступ */}
                <Box sx={{ width: "228px", flexShrink: 0 }} />

                {/* Прогресс бар */}
                <Box sx={{
                    position: "absolute",
                    left: "760px",
                }}>
                    <TrackProgress
                        left={currentTime}
                        right={duration}
                        onChange={changeCurrentTime}
                        disabled={loading}
                        showTime={true}
                        width="600px"
                    />
                </Box>

                {/* Отступ */}
                <Box sx={{ width: "300px", flexShrink: 0 }} />

                {/* Правая секция */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    minWidth: 200,
                    justifyContent: 'flex-end',
                    marginLeft: 'auto',
                    zIndex: 1
                }}>
                    {/* Кнопка громкости */}
                    <IconButton
                        disableRipple
                        onClick={toggleMute}
                        sx={{ color: '#ff6b35' }}
                    >
                        <Box
                            component="img"
                            src={isMuted ? PlayerVolumeOffIcon : PlayerVolumeOnIcon}
                            sx={{ width: 28, height: 28 }}
                        />
                    </IconButton>

                    {/* Прогресс бар громкости */}
                    <TrackProgress
                        left={isMuted ? 0 : volume}
                        right={100}
                        onChange={changeVolume}
                        showTime={false}
                        width="130px"
                    />

                    {/* Кнопка полноэкранного режима */}
                    <IconButton
                        disableRipple
                        onClick={handleFullScreenToggle}
                        sx={{
                            color: '#ff6b35',
                            '&:hover': {
                                '& .default-icon': {
                                    display: 'none'
                                },
                                '& .hover-icon': {
                                    display: 'block'
                                }
                            }
                        }}
                    >
                        <Box sx={{ position: 'relative', width: 28, height: 28 }}>
                            {isFullScreenMode ? (
                                <>
                                    <Box
                                        component="img"
                                        src={PlayerToggleOffFullModeIcon}
                                        className="default-icon"
                                        sx={{
                                            width: 28,
                                            height: 28,
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0
                                        }}
                                    />
                                    <Box
                                        component="img"
                                        src={HoverPlayerToggleOffFullModeIcon}
                                        className="hover-icon"
                                        sx={{
                                            width: 28,
                                            height: 28,
                                            display: 'none',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Box
                                        component="img"
                                        src={PlayerToggleFullMode}
                                        className="default-icon"
                                        sx={{
                                            width: 28,
                                            height: 28,
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0
                                        }}
                                    />
                                    <Box
                                        component="img"
                                        src={HoverPlayerToggleFullMode}
                                        className="hover-icon"
                                        sx={{
                                            width: 28,
                                            height: 28,
                                            display: 'none',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0
                                        }}
                                    />
                                </>
                            )}
                        </Box>
                    </IconButton>
                </Box>
            </Box>

            {/* Отображение ошибок */}
            {error && (
                <Typography
                    variant="body2"
                    sx={{
                        color: 'white',
                        ml: 2,
                        position: 'absolute',
                        bottom: 90,
                        left: 20,
                        backgroundColor: 'var(--dodger-blue)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        zIndex: (theme) => theme.zIndex.drawer + 3
                    }}
                >
                    {error}
                </Typography>
            )}
        </>
    );
};

export default MusicPlayer;