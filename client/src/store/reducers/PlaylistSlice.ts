// store/reducers/PlaylistSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchTopPlaylistsByWeek, fetchPlaylistDetails } from "./action-creators/playlist.ts";
import type { PlaylistSimpleDto } from "../../models/DTO/PlaylistSimpleDto.ts";
import type {PlaylistDto} from "../../models/PlaylistDto.ts";

interface PlaylistState {
    topPlaylists: PlaylistSimpleDto[];
    currentPlaylist: PlaylistDto | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: PlaylistState = {
    topPlaylists: [],
    currentPlaylist: null,
    isLoading: false,
    error: null
}

export const PlaylistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        clearCurrentPlaylist: (state) => {
            state.currentPlaylist = null;
        },
    },
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
            .addCase(fetchTopPlaylistsByWeek.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Unknown error';
            })

            .addCase(fetchPlaylistDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPlaylistDetails.fulfilled, (state, action: PayloadAction<PlaylistDto>) => {
                state.isLoading = false;
                state.currentPlaylist = action.payload;
                state.error = null;
            })
            .addCase(fetchPlaylistDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Ошибка при загрузке плейлиста";
            });
    }
})

export const { clearCurrentPlaylist } = PlaylistSlice.actions;
export default PlaylistSlice.reducer;