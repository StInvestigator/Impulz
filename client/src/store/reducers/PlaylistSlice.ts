import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {fetchTop20PlaylistsByWeek} from "./action-creators/playlist.ts";
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
            .addCase(fetchTop20PlaylistsByWeek.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchTop20PlaylistsByWeek.fulfilled, (state, action: PayloadAction<PlaylistSimpleDto[]>) => {
                state.isLoading = false;
                state.error = '';
                state.topPlaylists = action.payload;
            })
            .addCase(fetchTop20PlaylistsByWeek.rejected, (state, action: ReturnType<typeof fetchTop20PlaylistsByWeek.rejected>) => {
                state.isLoading = false;
                state.error = action.payload || 'Unknown error';
            });
    }
})

export default PlaylistSlice.reducer