import { useEffect, useState, useRef, useCallback } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box, Grid, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { pauseTrack, playTrack, setCurrentTime, setDuration, setVolume } from '../store/reducers/PlayerSlice';
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
            await $authApi.post('/api/tracks/playback', stats, {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
            });
        } catch (error) {
            console.error('Failed to send playback stats:', error);
        }

    },

    getStreamUrl: async (id: number): Promise<string> => {
        const response = await $authApi.get(`/api/music/stream/${id}`);
        return response.data;
    },
};

const MusicPlayer = () => {
    const { pause, currentTime, duration, volume } = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();
    const [streamUrl, setStreamUrl] = useState<string>('');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hasSentPlayback = useRef<boolean>(false);
    const trackIdRef = useRef<number>(5);

    const sendPlaybackStats = useCallback(async (currentTime: number, duration: number) => {
        if (hasSentPlayback.current) return;

        const shouldSend = currentTime >= 30 || currentTime >= duration;

        if (shouldSend && keycloak.authenticated) {
            const userId = keycloak.tokenParsed?.sub ||
                                          keycloak?.subject ||
                                          keycloak.idTokenParsed?.sub ||
                                          'unknown-user';
            const stats: PlaybackStats = {
                trackId: trackIdRef.current,
                currentTime: currentTime,
                duration: duration,
                userId: userId
            };

            try {
                await playbackService.sendPlaybackStats(stats);
                hasSentPlayback.current = true;
            } catch (error) {
                console.error('Failed to send playback stats:', error);
            }
        }
    }, []);

    useEffect(() => {
        const loadStream = async () => {
            try {
                const url = await playbackService.getStreamUrl(trackIdRef.current);
                setStreamUrl(url);

                if (!audioRef.current) {
                    audioRef.current = new Audio(url);

                    audioRef.current.onloadedmetadata = () => {
                        const audioDuration = Math.ceil(audioRef.current!.duration);
                        dispatch(setDuration(audioDuration));
                    };

                    audioRef.current.ontimeupdate = () => {
                        if (audioRef.current && !hasSentPlayback.current) {
                            const currentTime = audioRef.current.currentTime;
                            dispatch(setCurrentTime(Math.ceil(currentTime)));

                            if (currentTime >= 30 || currentTime >= audioRef.current.duration) {
                                sendPlaybackStats(currentTime, audioRef.current.duration);
                            }
                        }
                    };

                    audioRef.current.onended = () => {
                        if (audioRef.current && !hasSentPlayback.current) {
                            sendPlaybackStats(audioRef.current.duration, audioRef.current.duration);
                        }
                        dispatch(pauseTrack());
                    };
                }
            } catch (error) {
                console.error('Error loading stream:', error);
            }
        };

        loadStream();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            hasSentPlayback.current = false;
        };
    }, [dispatch, sendPlaybackStats]);

    const play = () => {
        if (!audioRef.current) return;

        if (pause) {
            dispatch(playTrack());
            audioRef.current.play().catch(console.error);
        } else {
            dispatch(pauseTrack());
            audioRef.current.pause();
        }
    };

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newVolume = Number(e.target.value) / 100;
            audioRef.current.volume = newVolume;
            dispatch(setVolume(Number(e.target.value)));
        }
    };

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = Number(e.target.value);
            audioRef.current.currentTime = newTime;
            dispatch(setCurrentTime(newTime));
        }
    };

    if (!streamUrl) {
        return <div>Loading...</div>;
    }

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
            <IconButton onClick={play}>
                {pause ? <PlayCircleIcon/> : <PauseCircleIcon/>}
            </IconButton>

            <Grid container direction="column" sx={{ width: 200, margin: '0 20px' }}>
                <Box>Бутырка-Шарик</Box>
                <Box sx={{ fontSize: 12, color: 'gray' }}>OopsSorry228</Box>
            </Grid>

            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>

            <VolumeUpIcon sx={{ marginLeft: 'auto' }}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </Box>
    );
};

export default MusicPlayer;