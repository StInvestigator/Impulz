import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {fetchTopPlaylistsByWeek, fetchPlaylistDetails, fetchPlaylistsOwnByUserId, fetchRecentPlaylistsByGenre} from "./action-creators/playlist.ts";
import type { PlaylistSimpleDto } from "../../models/DTO/PlaylistSimpleDto.ts";
import type {PlaylistDto} from "../../models/PlaylistDto.ts";

interface PlaylistState {
    topPlaylists: PlaylistDto[];
    currentPlaylist: PlaylistDto | null;
    playlistsOwnByCurrentUser: PlaylistSimpleDto[];
    recentPlaylistsByGenre: PlaylistDto[];
    isLoading: boolean;
    error: string | null;
}

const initialState: PlaylistState = {
    topPlaylists: [],
    currentPlaylist: null,
    playlistsOwnByCurrentUser: [],
    recentPlaylistsByGenre: [],
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
            .addCase(fetchTopPlaylistsByWeek.fulfilled, (state, action) => {
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
            })

            .addCase(fetchPlaylistsOwnByUserId.pending,(state) =>{
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPlaylistsOwnByUserId.fulfilled,(state,action) =>{
                state.isLoading = false;
                state.playlistsOwnByCurrentUser = action.payload;
                state.error = null;
            })
            .addCase(fetchPlaylistsOwnByUserId.rejected,(state,action) =>{
                state.isLoading = false;
                state.error = action.payload || "Ошибка при загрузке плейлистов пользователя"
            })

            .addCase(fetchRecentPlaylistsByGenre.pending,(state) =>{
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecentPlaylistsByGenre.fulfilled,(state,action) =>{
                state.isLoading = false;
                state.recentPlaylistsByGenre = action.payload;
                state.error = null;
            })
            .addCase(fetchRecentPlaylistsByGenre.rejected,(state,action)=>{
                state.isLoading = false;
                state.error = action.payload || "Ошибка при загрузке новых плейлистов по жанру";
            });
    }
})

export const { clearCurrentPlaylist } = PlaylistSlice.actions;
export default PlaylistSlice.reducer;