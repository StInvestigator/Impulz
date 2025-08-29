import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ITrack } from '../../models/TrackDto.ts';

interface PlayerState {
    active: null | ITrack;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
}

const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 50,
    pause: true
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        playTrack: (state) => {
            state.pause = false;
        },
        pauseTrack: (state) => {
            state.pause = true;
        },
        setActive: (state, action: PayloadAction<ITrack>) => {
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
        }
    }
});

export const { 
    playTrack, 
    pauseTrack, 
    setActive, 
    setDuration, 
    setCurrentTime, 
    setVolume 
} = playerSlice.actions;

export default playerSlice.reducer;
