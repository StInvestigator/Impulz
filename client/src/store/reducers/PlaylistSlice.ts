import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IPlaylist} from "../../models/IPlaylist.ts";
import {fetchPlaylists} from "./ActionCreators.ts";

interface PlaylistState {
    isLoading: boolean;
    playlists: IPlaylist[];
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
            .addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<IPlaylist[]>) => {
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