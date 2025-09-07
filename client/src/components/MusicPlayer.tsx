import React, { useEffect, useState, useRef, useCallback } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Box, Grid, IconButton, Link } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { pauseTrack, playTrack, setCurrentTime, setDuration, setVolume, nextTrack, prevTrack } from '../store/reducers/PlayerSlice';
import TrackProgress from './TrackProgress';
import { $authApi } from '../http/index.ts';
import keycloak from "../keycloak.ts";

interface PlaybackStats {
    trackId: number;
    currentTime: number;
    duration: number;
    userId: string;
}

const playbackService = {
    sendPlaybackStats: async (stats: PlaybackStats): Promise<void> => {
        try {
            await $authApi.post('/api/tracks/playback', stats);
        } catch (error) {
            console.error('Failed to send playback stats:', error);
        }
    },

    getStreamUrl: async (id: number): Promise<string> => {
        const response = await $authApi.get(`/api/music/link/${id}`)
        return response.data
    },
};

const MusicPlayer: React.FC = () => {
    const { active, playlist, currentTrackIndex, pause, currentTime, duration, volume } = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();

    const [streamUrl, setStreamUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const objectUrlRef = useRef<string | null>(null);
    const hasSentPlayback = useRef<boolean>(false);
    const listenedTimeRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

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
        };

        try {
            await playbackService.sendPlaybackStats(stats);
            hasSentPlayback.current = true;
        } catch (err) {
            console.error('Failed to send playback stats:', err);
        }
    }, [duration]);

    useEffect(() => {
        let mounted = true;
        if (!active) return;

        const loadStream = async () => {
            setLoading(true);
            setError(null);
            dispatch(pauseTrack());

            const url = await playbackService.getStreamUrl(active.id);
            if (!mounted) return;

            if (!url) {
                setError('Не удалось загрузить аудиопоток');
                setLoading(false);
                return;
            }

            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
            objectUrlRef.current = url;
            setStreamUrl(url);

            if (!audioRef.current) {
                const audio = new Audio(url);
                audio.volume = Math.max(0, Math.min(1, volume / 100));
                audioRef.current = audio;

                audio.onloadedmetadata = () => {
                    dispatch(setDuration(Math.ceil(audio.duration || 0)));
                };

                audio.ontimeupdate = () => {
                    if (!audioRef.current) return;
                    const cur = audioRef.current.currentTime;
                    dispatch(setCurrentTime(Math.ceil(cur)));

                    if (!audioRef.current.paused) {
                        const delta = cur - lastTimeRef.current;
                        if (delta > 0 && delta < 5) listenedTimeRef.current += delta;
                    }
                    lastTimeRef.current = cur;

                    if (listenedTimeRef.current >= 30) {
                        sendPlaybackStats();
                    }
                };

                audio.onended = () => {
                    sendPlaybackStats();
                    dispatch(nextTrack());
                };
            } else {
                audioRef.current.src = url;
                audioRef.current.load();
            }

            setLoading(false);
            dispatch(playTrack());
        };

        loadStream();

        return () => {
            mounted = false;
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.onloadedmetadata = null;
                audioRef.current.ontimeupdate = null;
                audioRef.current.onended = null;
                audioRef.current = null;
            }
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = null;
            }
            hasSentPlayback.current = false;
            listenedTimeRef.current = 0;
            lastTimeRef.current = 0;
        };
    }, [active]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = Math.max(0, Math.min(1, volume / 100));
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (pause) {
            if (!audio.paused) audio.pause();
        } else {
            if (audio.paused) audio.play().catch(err => {
                console.error('play error:', err);
            });
        }
    }, [pause]);

    const togglePlay = () => {
        if (pause) dispatch(playTrack());
        else dispatch(pauseTrack());
    };

    const handleNext = () => {
        dispatch(nextTrack());
    };

    const handlePrev = () => {
        dispatch(prevTrack());
    };

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        dispatch(setVolume(newVolume));
    };

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const newTime = Number(e.target.value);
        audioRef.current.currentTime = newTime;
        dispatch(setCurrentTime(newTime));
        lastTimeRef.current = newTime;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!streamUrl || !active) return <div>Аудио не доступно</div>;

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
            <IconButton aria-label="previous" onClick={handlePrev} disabled={playlist.length <= 1}>
                <SkipPreviousIcon />
            </IconButton>

            <IconButton aria-label="play-pause" onClick={togglePlay}>
                {pause ? <PlayCircleIcon /> : <PauseCircleIcon />}
            </IconButton>

            <IconButton aria-label="next" onClick={handleNext} disabled={playlist.length <= 1}>
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
                        href="/"
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

            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />

            <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <VolumeUpIcon sx={{ marginRight: 1 }} />
                <TrackProgress left={volume} right={100} onChange={changeVolume} />
            </Box>

            {playlist.length > 1 && (
                <Box sx={{ marginLeft: 2, fontSize: 12, color: 'gray' }}>
                    {currentTrackIndex + 1} / {playlist.length}
                </Box>
            )}
        </Box>
    );
};

export default MusicPlayer;