import React, { useEffect, useState, useRef, useCallback } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Box, Grid, IconButton, Link, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { pauseTrack, playTrack, setCurrentTime, setDuration, setVolume, nextTrack, prevTrack } from '../store/reducers/PlayerSlice';
import TrackProgress from './TrackProgress';
import { $authApi } from '../http';
import keycloak from "../keycloak.ts";

interface PlaybackStats {
    trackId: number;
    currentTime: number;
    duration: number;
    userId: string;
    sessionId: string;
}

const generateSessionId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const playbackService = {
    sendPlaybackStats: async (stats: PlaybackStats): Promise<void> => {
        try {
            await $authApi.post('/api/tracks/playback', stats);
        } catch (error) {
            console.error('Ошибка отправки статистики прослушивания:', error);
        }
    },

    getStreamUrl: async (id: number): Promise<string> => {
        const response = await $authApi.get(`/api/music/link/${id}`)
        return response.data
    },
};

const MusicPlayer: React.FC = () => {
    const { active, playlist, pause, currentTime, duration, volume, currentTrackIndex } = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const objectUrlRef = useRef<string | null>(null);
    const sessionIdRef = useRef<string>('');
    const hasSentPlayback = useRef<boolean>(false);
    const listenedTimeRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const isMountedRef = useRef<boolean>(true);

    const isLastTrack = currentTrackIndex >= playlist.length - 1;
    const isFirstTrack = currentTrackIndex <= 0;

    useEffect(() => {
        const savedVolume = localStorage.getItem('playerVolume');
        if (savedVolume) {
            const volumeValue = parseInt(savedVolume, 10);
            if (!isNaN(volumeValue) && volumeValue >= 0 && volumeValue <= 100) {
                dispatch(setVolume(volumeValue));
            }
        }
    }, [dispatch]);

    const sendPlaybackStats = useCallback(async () => {
        if (hasSentPlayback.current) return;
        if (!keycloak?.authenticated) return;
        if (!active) return;

        const audio = audioRef.current;
        if (!audio) return;

        const userId = keycloak.tokenParsed?.sub || keycloak?.subject || keycloak.idTokenParsed?.sub || 'unknown-user';
        const stats: PlaybackStats = {
            trackId: active.id,
            currentTime: Math.min(audio.currentTime, duration),
            duration,
            userId,
            sessionId: sessionIdRef.current
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
                    audioRef.current.onloadedmetadata = null;
                    audioRef.current.oncanplay = null;
                    audioRef.current.ontimeupdate = null;
                    audioRef.current.onended = null;
                    audioRef.current.onerror = null;
                }

                if (objectUrlRef.current) {
                    URL.revokeObjectURL(objectUrlRef.current);
                }

                objectUrlRef.current = url;

                const audio = new Audio();
                audio.volume = Math.max(0, Math.min(1, volume / 100));
                audioRef.current = audio;

                audio.onloadedmetadata = () => {
                    if (!mounted || !isMountedRef.current) return;
                    dispatch(setDuration(Math.ceil(audio.duration || 0)));
                };

                audio.oncanplay = () => {
                    if (!mounted || !isMountedRef.current) return;
                    setLoading(false);

                    audio.play().catch(err => {
                        console.error('Ошибка автовоспроизведения:', err);
                        setError('Ошибка воспроизведения аудио');
                        dispatch(pauseTrack());
                    });
                };

                audio.onplay = () => {
                    dispatch(playTrack());
                };

                audio.onpause = () => {
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
                    const cur = audio.currentTime;
                    dispatch(setCurrentTime(Math.ceil(cur)));

                    if (!audio.paused) {
                        const delta = cur - lastTimeRef.current;
                        if (delta > 0 && delta < 5) listenedTimeRef.current += delta;
                    }
                    lastTimeRef.current = cur;

                    if (listenedTimeRef.current >= 30) {
                        sendPlaybackStats();
                    }
                };

                audio.onended = () => {
                    if (!mounted || !isMountedRef.current) return;
                    sendPlaybackStats();

                    if (!isLastTrack) {
                        dispatch(nextTrack());
                    } else {
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

        return () => {
            mounted = false;
        };
    }, [active, dispatch, sendPlaybackStats, isLastTrack]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = Math.max(0, Math.min(1, volume / 100));
        }
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (pause && !audio.paused) {
            audio.pause();
        } else if (!pause && audio.paused && audio.readyState >= 2) {
            audio.play().catch(err => {
                console.error('Play error:', err);
                setError('Ошибка воспроизведения');
            });
        }
    }, [pause]);

    const togglePlay = () => {
        if (pause) {
            dispatch(playTrack());
        } else {
            dispatch(pauseTrack());
        }
    };

    const handleNext = () => {
        if (!isLastTrack) {
            dispatch(nextTrack());
        }
    };

    const handlePrev = () => {
        if (!isFirstTrack) {
            dispatch(prevTrack());
        }
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

    if (!active) {
        return null;
    }

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
            <IconButton
                aria-label="previous"
                onClick={handlePrev}
                disabled={isFirstTrack || playlist.length <= 1}
            >
                <SkipPreviousIcon />
            </IconButton>

            <IconButton aria-label="play-pause" onClick={togglePlay}>
                {pause ? <PlayCircleIcon /> : <PauseCircleIcon />}
            </IconButton>

            <IconButton
                aria-label="next"
                onClick={handleNext}
                disabled={isLastTrack || playlist.length <= 1}
            >
                <SkipNextIcon />
            </IconButton>

            <Grid container direction="column" sx={{ width: 240, margin: '0 20px' }}>
                <Box sx={{ fontWeight: 600 }}>{active.title ?? 'Unknown title'}</Box>
                <Box sx={{ fontSize: 12, color: 'gray' }}>
                    {active.authors && active.authors.length > 0 ? (
                        active.authors.map((author, index) => (
                            <React.Fragment key={author.id}>
                                <Link
                                    href={`/author/${author.id}`}
                                    underline="none"
                                    sx={{
                                        color: 'inherit',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            color: '#1976d2',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    {author.name}
                                </Link>
                                {index < active.authors.length - 1 && ', '}
                            </React.Fragment>
                        ))
                    ) : (
                        'Unknown artist'
                    )}
                    <Box component="span" sx={{ mx: 1 }}>•</Box>
                    <Link
                        href={`/album/${active.albumId}`}
                        underline="none"
                        sx={{
                            color: 'inherit',
                            '&:hover': {
                                textDecoration: 'underline',
                                color: '#1976d2',
                                cursor: 'pointer',
                            },
                        }}
                    >
                        {active.album ?? 'Unknown album'}
                    </Link>
                </Box>
            </Grid>

            <TrackProgress
                left={currentTime}
                right={duration}
                onChange={changeCurrentTime}
                disabled={loading}
            />

            <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <VolumeUpIcon sx={{ marginRight: 1 }} />
                <TrackProgress left={volume} right={100} onChange={changeVolume} />
            </Box>

            {error && (
                <Typography variant="body2" color="error" sx={{ ml: 2 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default MusicPlayer;