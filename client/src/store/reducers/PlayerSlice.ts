import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TrackSimpleDto } from '../../models/DTO/TrackSimpleDto.ts';

interface PlayerState {
    active: TrackSimpleDto | null;
    playlist: TrackSimpleDto[];
    currentTrackIndex: number;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
}

const initialState: PlayerState = {
    active: null,
    playlist: [],
    currentTrackIndex: -1,
    currentTime: 0,
    duration: 0,
    volume: 50,
    pause: true
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlaylist: (state, action: PayloadAction<TrackSimpleDto[]>) => {
            state.playlist = action.payload;
            state.currentTrackIndex = 0;
            state.active = action.payload[0] || null;
            state.duration = 0;
            state.currentTime = 0;
            state.pause = true;
        },
        playTrack: (state) => {
            state.pause = false;
        },
        pauseTrack: (state) => {
            state.pause = true;
        },
        nextTrack: (state) => {
            if (state.playlist.length === 0) return;
            const nextIndex = (state.currentTrackIndex + 1) % state.playlist.length;
            state.currentTrackIndex = nextIndex;
            state.active = state.playlist[nextIndex];
            state.duration = 0;
            state.currentTime = 0;
        },
        prevTrack: (state) => {
            if (state.playlist.length === 0) return;
            const prevIndex = (state.currentTrackIndex - 1 + state.playlist.length) % state.playlist.length;
            state.currentTrackIndex = prevIndex;
            state.active = state.playlist[prevIndex];
            state.duration = 0;
            state.currentTime = 0;
        },
        setCurrentTrack: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0 && action.payload < state.playlist.length) {
                state.currentTrackIndex = action.payload;
                state.active = state.playlist[action.payload];
                state.duration = 0;
                state.currentTime = 0;
            }
        },
        setTrackActive: (state, action: PayloadAction<TrackSimpleDto>) => {
            state.active = action.payload;
            state.duration = 0;
            state.currentTime = 0;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        clearPlaylist: (state) => {
            state.playlist = [];
            state.currentTrackIndex = -1;
            state.active = null;
            state.duration = 0;
            state.currentTime = 0;
            state.pause = true;
        }
    }
});

export const {
    setPlaylist,
    playTrack,
    pauseTrack,
    nextTrack,
    prevTrack,
    setCurrentTrack,
    setDuration,
    setCurrentTime,
    setVolume,
    clearPlaylist
} = playerSlice.actions;

export default playerSlice.reducer;
