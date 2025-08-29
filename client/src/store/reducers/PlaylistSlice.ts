import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {PlaylistDto} from "../../models/PlaylistDto.ts";
import {fetchPlaylists} from "./action-creators/playlist.ts";

interface PlaylistState {
    isLoading: boolean;
    playlists: PlaylistDto[];
    error: string;
}

const initialState: PlaylistState = {
    isLoading: false,
    playlists: [],
    error: ""
}

export const PlaylistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaylists.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<PlaylistDto[]>) => {
                state.isLoading = false;
                state.error = '';
                state.playlists = action.payload;
            })
            .addCase(fetchPlaylists.rejected, (state, action: ReturnType<typeof fetchPlaylists.rejected>) => {
                state.isLoading = false;
                state.error = action.payload || 'Unknown error';
            });
    }
})

export default PlaylistSlice.reducer