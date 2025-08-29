import { useEffect, useState, useRef, useCallback } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box, Grid, IconButton,Link } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { pauseTrack, playTrack, setCurrentTime, setDuration, setVolume } from '../store/reducers/PlayerSlice';
import TrackProgress from './TrackProgress';
import { $authApi } from '../http/index.ts';
import keycloak from "../keycloak.ts";
import type { TrackSimpleDto } from "../models/DTO/TrackSimpleDto.ts";

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
    getStreamUrl: (id: number): string => {
        return `http://localhost:8083/api/music/stream/${id}`;
    },
};

const trackDataService = {
    getTrackDataById: async (id: number): Promise<TrackSimpleDto> => {
        const response = await $authApi.get(`/api/track/Dto/${id}`);
        return response.data;
    }
}

const MusicPlayer = () => {
    const { pause, currentTime, duration, volume } = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();
    const [streamUrl, setStreamUrl] = useState<string>('');
    const [trackData, setTrackData] = useState<TrackSimpleDto | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hasSentPlayback = useRef<boolean>(false);
    const trackIdRef = useRef<number>(5);
    const listenedTimeRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    const sendPlaybackStats = useCallback(async () => {
        if (hasSentPlayback.current || !keycloak.authenticated || !audioRef.current) return;
        const userId = keycloak.tokenParsed?.sub || keycloak?.subject || keycloak.idTokenParsed?.sub || 'unknown-user';
        const stats: PlaybackStats = {
            trackId: trackIdRef.current,
            currentTime: Math.min(audioRef.current.currentTime, duration),
            duration: duration,
            userId: userId
        };
        try {
            await playbackService.sendPlaybackStats(stats);
            hasSentPlayback.current = true;
        } catch (error) {
            console.error('Failed to send playback stats:', error);
        }
    }, [duration]);

    useEffect(() => {
        const loadStream = async () => {
            const url = playbackService.getStreamUrl(trackIdRef.current);
            setStreamUrl(url);
            const trackDataResponse = await trackDataService.getTrackDataById(trackIdRef.current);
            setTrackData(trackDataResponse);

            if (!audioRef.current) {
                const audio = new Audio(url);
                audio.volume = volume / 100;
                audioRef.current = audio;

                audio.onloadedmetadata = () => {
                    dispatch(setDuration(Math.ceil(audio.duration)));
                };

                audio.ontimeupdate = () => {
                    if (!audioRef.current) return;
                    const current = audioRef.current.currentTime;
                    dispatch(setCurrentTime(Math.ceil(current)));

                    if (!audioRef.current.paused) {
                        const delta = current - lastTimeRef.current;
                        if (delta > 0 && delta < 5) listenedTimeRef.current += delta;
                    }
                    lastTimeRef.current = current;

                    if (listenedTimeRef.current >= 30) sendPlaybackStats();
                };

                audio.onended = () => {
                    sendPlaybackStats();
                    dispatch(pauseTrack());
                };
            }
        };

        loadStream();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            hasSentPlayback.current = false;
            listenedTimeRef.current = 0;
            lastTimeRef.current = 0;
        };
    }, [dispatch, sendPlaybackStats]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume / 100;
    }, [volume]);

    useEffect(() => {
        if (!audioRef.current) return;
        if (pause && !audioRef.current.paused) audioRef.current.pause();
        if (!pause && audioRef.current.paused) audioRef.current.play().catch(console.error);
    }, [pause]);

    const play = () => {
        dispatch(pause ? playTrack() : pauseTrack());
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

    if (!streamUrl || !trackData) return <div>Loading...</div>;

    return (
        <Box
            height={"60px"}
            width={"100%"}
            position={"fixed"}
            bottom={0}
            display={"flex"}
            alignItems={"center"}
            padding={"0 10px"}
            bgcolor={"lightgray"}
            boxSizing={"border-box"}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
        >
            <IconButton onClick={play}>{pause ? <PlayCircleIcon/> : <PauseCircleIcon/>}</IconButton>
            <Grid container direction="column" sx={{ width: 200, margin: '0 20px' }}>
                <Box>{trackData.title}</Box>
                {/* TODO href */}
                <Box sx={{ fontSize: 12, color: 'gray' }}>
                    <Link
                        href="#"
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
                        {trackData.authors.map(author => author).join(', ')}
                    </Link>
                    <s style={{ margin: '5px' }}>•</s>
                    <Link
                        href="#"
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
                        {trackData.album}
                    </Link>
                </Box>

            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUpIcon sx={{ marginLeft: 'auto' }}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </Box>
    );
};

export default MusicPlayer;
