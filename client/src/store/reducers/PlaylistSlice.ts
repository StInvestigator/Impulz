import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {fetchTopPlaylistsByWeek} from "./action-creators/playlist.ts";
import type { PlaylistSimpleDto } from "../../models/DTO/PlaylistSimpleDto.ts";

interface PlaylistState {
    topPlaylists: PlaylistSimpleDto[];
    isLoading: boolean;
    error: string | null;
}

const initialState: PlaylistState = {
    topPlaylists: [],
    isLoading: false,
    error: null
}

export const PlaylistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopPlaylistsByWeek.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchTopPlaylistsByWeek.fulfilled, (state, action: PayloadAction<PlaylistSimpleDto[]>) => {
                state.isLoading = false;
                state.error = '';
                state.topPlaylists = action.payload;
            })
            .addCase(fetchTopPlaylistsByWeek.rejected, (state, action: ReturnType<typeof fetchTopPlaylistsByWeek.rejected>) => {
                state.isLoading = false;
                state.error = action.payload || 'Unknown error';
            });
    }
})

export default PlaylistSlice.reducer