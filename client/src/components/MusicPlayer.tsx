// MusicPlayer.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box, Grid, IconButton, Link } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { pauseTrack, playTrack, setCurrentTime, setDuration, setVolume } from '../store/reducers/PlayerSlice';
import TrackProgress from './TrackProgress';
import { $authApi } from '../http/index.ts';
import keycloak from "../keycloak.ts";
import type { TrackSimpleDto } from '../models/DTO/TrackSimpleDto.ts';

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

    // Возвращаем objectURL (string) или null при ошибке
    getStreamUrl: async (id: number): Promise<string | null> => {
        try {
            const res = await $authApi.get(`/api/music/stream/${id}`, {
                responseType: 'blob',
                headers: {
                    Accept: 'audio/*'
                },

            });

            const contentType = res.headers['content-type'] || 'audio/mpeg';
            const blob = res.data instanceof Blob ? res.data : new Blob([res.data], { type: contentType });
            return URL.createObjectURL(blob);
        } catch (err) {
            console.error('getStreamUrl error:', err);
            return null;
        }
    },
};

const trackDataService = {
    getTrackDataById: async (id: number): Promise<TrackSimpleDto> => {
        const response = await $authApi.get(`/api/track/Dto/${id}`);
        return response.data;
    },
};

const MusicPlayer: React.FC = () => {
    const { pause, currentTime, duration, volume } = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();

    const [streamUrl, setStreamUrl] = useState<string | null>(null);
    const [trackData, setTrackData] = useState<TrackSimpleDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const objectUrlRef = useRef<string | null>(null); // храним текущий objectURL чтобы revoke при смене
    const hasSentPlayback = useRef<boolean>(false);
    const trackIdRef = useRef<number>(5); // замените на реальный trackId из пропсов/редукса
    const listenedTimeRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    const sendPlaybackStats = useCallback(async () => {
        if (hasSentPlayback.current) return;
        if (!keycloak?.authenticated) return;

        const audio = audioRef.current;
        if (!audio) return;

        const userId = keycloak.tokenParsed?.sub || keycloak?.subject || keycloak.idTokenParsed?.sub || 'unknown-user';
        const stats: PlaybackStats = {
            trackId: trackIdRef.current,
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

        const loadStream = async () => {
            setLoading(true);
            setError(null);

            // 1) получить stream URL (objectURL)
            const url = await playbackService.getStreamUrl(trackIdRef.current);
            if (!mounted) return;

            if (!url) {
                setError('Не удалось загрузить аудиопоток');
                setLoading(false);
                return;
            }

            // revoke предыдущий URL, если был
            if (objectUrlRef.current) {
                try { URL.revokeObjectURL(objectUrlRef.current); } catch (e) { /*ignore*/ }
            }
            objectUrlRef.current = url;
            setStreamUrl(url);

            // 2) получить метаданные трека
            try {
                const trackInfo = await trackDataService.getTrackDataById(trackIdRef.current);
                if (!mounted) return;
                setTrackData(trackInfo);
            } catch (err) {
                console.error('Failed to get track data:', err);
                if (mounted) setError('Не удалось получить данные трека');
            }

            // 3) создаём audio (если ещё нет) и настраиваем обработчики
            if (!audioRef.current) {
                const audio = new Audio(url);
                // crossOrigin устанавливаем только если необходимо (и сервер поддерживает CORS)
                // audio.crossOrigin = 'use-credentials'; // либо 'anonymous'
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

                    // отправляем, когда прослушали >= 30 сек
                    if (listenedTimeRef.current >= 30) {
                        sendPlaybackStats();
                    }
                };

                audio.onended = () => {
                    // при окончании можно попытаться отправить ещё раз (если не отправлено)
                    sendPlaybackStats();
                    dispatch(pauseTrack());
                };
            } else {
                // если audioRef уже есть (например, при повторном вызове), просто сменим src
                audioRef.current.src = url;
                audioRef.current.load();
            }

            setLoading(false);
        };

        loadStream();

        return () => {
            mounted = false;
            // cleanup audio
            if (audioRef.current) {
                try {
                    audioRef.current.pause();
                } catch (e) { /* ignore */ }
                // не удаляем handlers явно — GC очистит, но можно:
                audioRef.current.onloadedmetadata = null;
                audioRef.current.ontimeupdate = null;
                audioRef.current.onended = null;
                audioRef.current = null;
            }
            // revoke objectURL
            if (objectUrlRef.current) {
                try { URL.revokeObjectURL(objectUrlRef.current); } catch (e) { /*ignore*/ }
                objectUrlRef.current = null;
            }
            // reset playback tracking
            hasSentPlayback.current = false;
            listenedTimeRef.current = 0;
            lastTimeRef.current = 0;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, sendPlaybackStats]); // trackIdRef не в deps т.к. ref; volume отдельно ниже

    // синхронизируем volume
    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = Math.max(0, Math.min(1, volume / 100));
    }, [volume]);

    // pause/play в зависимости от глобального состояния
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (pause) {
            if (!audio.paused) audio.pause();
        } else {
            if (audio.paused) audio.play().catch(err => {
                // play может быть заблокирован политиками автоплея
                console.error('play error:', err);
            });
        }
    }, [pause]);

    const togglePlay = () => {
        // переключаем глобальное состояние плей/пауза
        if (pause) dispatch(playTrack());
        else dispatch(pauseTrack());
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
    if (!streamUrl || !trackData) return <div>Аудио не доступно</div>;

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
            <IconButton aria-label="play-pause" onClick={togglePlay}>
                {pause ? <PlayCircleIcon /> : <PauseCircleIcon />}
            </IconButton>

            <Grid container direction="column" sx={{ width: 240, margin: '0 20px' }}>
                <Box sx={{ fontWeight: 600 }}>{trackData.title ?? 'Unknown title'}</Box>
                <Box sx={{ fontSize: 12, color: 'gray' }}>
                    <Box>{trackData.authors?.map(a => a).join(', ') ?? 'Unknown artist'}</Box>
                    <Box component="span" sx={{ mx: 1 }}>•</Box>
                    <Box>{trackData.album.title ?? 'Unknown album'}</Box>
                </Box>
            </Grid>

            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />

            <VolumeUpIcon sx={{ marginLeft: 'auto', marginRight: 1 }} />
            <TrackProgress left={volume} right={100} onChange={changeVolume} />
        </Box>
    );
};

export default MusicPlayer;
