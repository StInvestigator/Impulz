import React, { useEffect, useState, useRef, useCallback } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { Box, CircularProgress, Grid, IconButton, Typography, Tooltip } from '@mui/material';
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

const MusicPlayer: React.FC = () => {
    const {
        active,
        playlist,
        pause,
        currentTime,
        duration,
        volume,
        currentTrackIndex,
        source,
        playbackMode,
        bufferTracks
    } = useAppSelector((state) => state.player);

    const dispatch = useAppDispatch();

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
    const route = useNavigate();

    const isLastTrack = currentTrackIndex >= playlist.length - 1;
    const isFirstTrack = currentTrackIndex <= 0;

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
            objectUrlRef.current = null;
            return;
        }

        let mounted = true;
        sessionIdRef.current = generateSessionId();
        hasSentPlayback.current = false;
        listenedTimeRef.current = 0;
        lastTimeRef.current = 0;

        const loadStream = async () => {
            setLoading(true);
            setError(null);
            dispatch(pauseTrack());

            try {
                const url = await playbackService.getStreamUrl(active.id);
                if (!mounted || !isMountedRef.current) return;

                if (!url) {
                    setError('Не удалось загрузить аудиопоток');
                    setLoading(false);
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
                    if (!mounted || !isMountedRef.current) return;
                    dispatch(setDuration(Math.ceil(audio.duration || 0)));
                };

                audio.oncanplay = () => {
                    if (!mounted || !isMountedRef.current) return;
                    setLoading(false);
                    audio.play().catch((err) => {
                        console.error('Ошибка автовоспроизведения:', err);
                        setError('Ошибка воспроизведения аудио');
                        dispatch(pauseTrack());
                    });
                };

                audio.onplay = () => dispatch(playTrack());
                audio.onpause = () => dispatch(pauseTrack());

                audio.onerror = (e) => {
                    if (!mounted || !isMountedRef.current) return;
                    console.error('Audio error:', e);
                    setError('Ошибка загрузки аудио');
                    setLoading(false);
                };

                audio.ontimeupdate = () => {
                    if (!mounted || !isMountedRef.current) return;
                    const cur = audio.currentTime;
                    dispatch(setCurrentTime(Math.ceil(cur)));

                    if (!audio.paused) {
                        const delta = cur - lastTimeRef.current;
                        if (delta > 0 && delta < 5) listenedTimeRef.current += delta;
                    }
                    lastTimeRef.current = cur;

                    if (listenedTimeRef.current >= 30) sendPlaybackStats();
                };

                audio.onended = async () => {
                    const isLastTrack = currentTrackIndex >= playlist.length - 1;

                    console.log('Трек завершен:', {
                        isLastTrack,
                        currentTrackIndex,
                        playlistLength: playlist.length,
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
                                    dispatch(pauseTrack());
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
                                dispatch(pauseTrack());
                            }
                        } catch (error) {
                            console.error('Ошибка загрузки треков:', error);
                            dispatch(setSourceHasMore(false));
                            dispatch(pauseTrack());
                        }
                    } else {
                        console.log('Больше нет треков, останавливаем воспроизведение');
                        dispatch(pauseTrack());
                    }
                };

                audio.src = url;
                audio.load();
            } catch (err) {
                if (!mounted || !isMountedRef.current) return;
                console.error('Load stream error:', err);
                setError('Ошибка загрузки трека');
                setLoading(false);
            }
        };

        loadStream();
        return () => { mounted = false; };
    }, [active, dispatch, sendPlaybackStats, playlist, currentTrackIndex, source, appendBufferToPlaylist, loadNextPageToBuffer]);

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

    const togglePlaybackMode = () => {
        const newMode = playbackMode === "replace" ? "append" : "replace";
        dispatch(setPlaybackMode(newMode));
        localStorage.setItem('playerPlaybackMode', newMode);
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
        if (!audioRef.current) return;
        const newTime = Number(e.target.value);
        audioRef.current.currentTime = newTime;
        dispatch(setCurrentTime(newTime));
        lastTimeRef.current = newTime;
    };

    if (!active) return null;

    return (
        <Box
            height="60px"
            width="100%"
            position="fixed"
            bottom={0}
            display="flex"
            alignItems="center"
            padding="0 10px"
            bgcolor="lightgray"
            boxSizing="border-box"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
        >
            <IconButton aria-label="previous" onClick={handlePrev} disabled={isFirstTrack}>
                <SkipPreviousIcon />
            </IconButton>

            {loading ? (
                <Box sx={{ padding: '8px' }}>
                    <CircularProgress size={24} />
                </Box>
            ) : (
                <IconButton aria-label="play-pause" onClick={togglePlay}>
                    {pause ? <PlayCircleIcon /> : <PauseCircleIcon />}
                </IconButton>
            )}

            <IconButton aria-label="next" onClick={handleNext} disabled={isLastTrack && !source?.hasMore}>
                <SkipNextIcon />
            </IconButton>

            <Tooltip title={playbackMode === "replace" ? "Режим замены" : "Режим добавления в очередь"}>
                <IconButton onClick={togglePlaybackMode} color={playbackMode === "append" ? "primary" : "default"}>
                    {playbackMode === "replace" ? <PlaylistPlayIcon /> : <PlaylistAddIcon />}
                </IconButton>
            </Tooltip>

            <Grid container direction="column" sx={{ width: 240, margin: '0 20px' }}>
                <Box sx={{ fontWeight: 600 }}>{active.title ?? 'Unknown title'}</Box>
                <Box sx={{
                    fontSize: 12,
                    color: 'gray',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                    whiteSpace: 'nowrap'
                }}>
                    {active.authors?.map((author, index) => (
                        <React.Fragment key={author.id}>
                            <Typography
                                onClick={() => route(`/author/${author.id}`)}
                                sx={{
                                    color: 'inherit',
                                    fontSize: "11px",
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        color: '#1976d2',
                                        cursor: 'pointer'
                                    }
                                }}
                            >
                                {author.name}
                            </Typography>
                            {index < active.authors.length - 1 && ', '}
                        </React.Fragment>
                    )) || 'Unknown artist'}
                    <Box component="span" sx={{ mx: 1 }}>•</Box>
                    <Typography
                        onClick={() => route(`/album/${active.albumId}`)}
                        sx={{
                            color: 'inherit',
                            fontSize: "11px",
                            whiteSpace: 'nowrap',
                            '&:hover': {
                                textDecoration: 'underline',
                                color: '#1976d2',
                                cursor: 'pointer'
                            }
                        }}
                    >
                        {active.album ?? 'Unknown album'}
                    </Typography>
                </Box>
                <Box sx={{ fontSize: 10, color: 'darkgray' }}>
                    {currentTrackIndex + 1} из {playlist.length} в очереди
                </Box>
            </Grid>

            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} disabled={loading} />

            <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <VolumeUpIcon sx={{ marginRight: 1 }} />
                <TrackProgress left={volume} right={100} onChange={changeVolume} />
            </Box>

            {error && <Typography variant="body2" color="error" sx={{ ml: 2 }}>{error}</Typography>}
        </Box>
    );
};

export default MusicPlayer;