import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    fetchTopTracksByWeek,
    fetchPopularTracksByAuthor,
    fetchAuthorTrackCollaborations,
    fetchTracksByAlbum,
    fetchPopularTracksByGenre,
    fetchTracksByPlaylist, fetchLikedTracksByUserId,
    fetchPopularTracksByAuthorForPlayer,
    fetchLikedTracksByUserIdForPlayer,
    fetchTracksByAlbumForPlayer
} from "./action-creators/tracks.ts";
import type { TrackSimpleDto } from "../../models/DTO/track/TrackSimpleDto.ts";

interface TrackState {
    topTracks: TrackSimpleDto[];
    popularTracks: TrackSimpleDto[];
    popularTracksByAuthorForPlayer: TrackSimpleDto[];
    collaborationTracks: TrackSimpleDto[];
    tracksByAlbum: TrackSimpleDto[];
    tracksByAlbumForPlayer: TrackSimpleDto[];
    popularTracksByGenre: TrackSimpleDto[];
    likedTracks: TrackSimpleDto[];
    likedTracksForPlayer: TrackSimpleDto[];
    isLoading: boolean;
    isFetchByAuthorLoading: boolean;
    isFetchByPlaylistLoading: boolean;
    isFetchByAlbumLoading: boolean;
    isFetchByAlbumForPlayerLoading: boolean;
    isFetchByGenreLoading: boolean;
    isFetchByUserLoading: boolean;
    isFetchByUserForPlayerLoading: boolean;
    isFetchByAuthorForPlayerLoading: boolean;
    error: string | null;
}

const initialState: TrackState = {
    topTracks: [],
    popularTracks: [],
    popularTracksByAuthorForPlayer: [],
    collaborationTracks: [],
    tracksByAlbum: [],
    tracksByAlbumForPlayer: [],
    popularTracksByGenre: [],
    likedTracks: [],
    likedTracksForPlayer: [],
    isLoading: false,
    isFetchByAuthorLoading: false,
    isFetchByPlaylistLoading: false,
    isFetchByAlbumLoading: false,
    isFetchByAlbumForPlayerLoading: false,
    isFetchByGenreLoading: false,
    isFetchByUserLoading: false,
    isFetchByUserForPlayerLoading: false,
    isFetchByAuthorForPlayerLoading: false,
    error: null,
};

const trackSlice = createSlice({
    name: "track",
    initialState,
    reducers: {
        removeFromLikedTracks: (state, action: PayloadAction<number>) => {
            const index: number = state.likedTracks.findIndex(t => t.id == action.payload)
            if (index > -1) {
                state.likedTracks.splice(index, 1);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopTracksByWeek.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTopTracksByWeek.fulfilled, (state, action) => {
                state.isLoading = false;
                state.topTracks = action.payload;
                state.error = null;
            })
            .addCase(fetchTopTracksByWeek.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при загрузке треков";
            })

            .addCase(fetchPopularTracksByAuthor.pending, (state) => {
                state.isFetchByAuthorLoading = true;
            })
            .addCase(fetchPopularTracksByAuthor.fulfilled, (state, action) => {
                state.isFetchByAuthorLoading = false;
                state.popularTracks = action.payload;
                state.error = null;
            })
            .addCase(fetchPopularTracksByAuthor.rejected, (state, action) => {
                state.isFetchByAuthorLoading = false;
                state.error = action.error.message || "Ошибка при загрузке популярных треков автора";
            })

            .addCase(fetchPopularTracksByAuthorForPlayer.pending, (state) => {
                state.isFetchByAuthorForPlayerLoading = true;
            })
            .addCase(fetchPopularTracksByAuthorForPlayer.fulfilled, (state, action) => {
                state.isFetchByAuthorForPlayerLoading = false;
                state.popularTracksByAuthorForPlayer = action.payload;
                state.error = null;
            })
            .addCase(fetchPopularTracksByAuthorForPlayer.rejected, (state, action) => {
                state.isFetchByAuthorForPlayerLoading = false;
                state.error = action.error.message || "Ошибка при загрузке популярных треков автора";
            })

            .addCase(fetchAuthorTrackCollaborations.pending, (state) => {
                state.isFetchByAuthorLoading = true;
            })
            .addCase(fetchAuthorTrackCollaborations.fulfilled, (state, action) => {
                state.isFetchByAuthorLoading = false;
                state.collaborationTracks = action.payload;
                state.error = null;
            })
            .addCase(fetchAuthorTrackCollaborations.rejected, (state, action) => {
                state.isFetchByAuthorLoading = false;
                state.error = action.error.message || "Ошибка при загрузке коллабораций";
            })

            .addCase(fetchTracksByAlbum.pending, (state) => {
                state.isFetchByAlbumLoading = true;
                state.error = null;
            })
            .addCase(fetchTracksByAlbum.fulfilled, (state, action) => {
                state.isFetchByAlbumLoading = false;
                state.tracksByAlbum = action.payload;
                state.error = null;
            })
            .addCase(fetchTracksByAlbum.rejected, (state, action) => {
                state.isFetchByAlbumLoading = false;
                state.error = action.error.message || "Ошибка при загрузки треков альбома";
            })

            .addCase(fetchTracksByAlbumForPlayer.pending, (state) => {
                state.isFetchByAlbumForPlayerLoading = true;
                state.error = null;
            })
            .addCase(fetchTracksByAlbumForPlayer.fulfilled, (state, action) => {
                state.isFetchByAlbumForPlayerLoading = false;
                state.tracksByAlbumForPlayer = action.payload;
                state.error = null;
            })
            .addCase(fetchTracksByAlbumForPlayer.rejected, (state, action) => {
                state.isFetchByAlbumForPlayerLoading = false;
                state.error = action.error.message || "Ошибка при загрузки треков альбома";
            })

            .addCase(fetchTracksByPlaylist.pending, (state) => {
                state.isFetchByPlaylistLoading = true;
                state.error = null;
            })
            .addCase(fetchTracksByPlaylist.fulfilled, (state, action) => {
                state.isFetchByPlaylistLoading = false;
                state.tracksByAlbum = action.payload;
                state.error = null;
            })
            .addCase(fetchTracksByPlaylist.rejected, (state, action) => {
                state.isFetchByPlaylistLoading = false;
                state.error = action.error.message || "Ошибка при загрузки треков плейлиста";
            })

            .addCase(fetchPopularTracksByGenre.pending, (state) => {
                state.isFetchByGenreLoading = true;
                state.error = null;
            })
            .addCase(fetchPopularTracksByGenre.fulfilled, (state, action) => {
                state.isFetchByGenreLoading = false;
                state.popularTracksByGenre = action.payload;
                state.error = null;
            })
            .addCase(fetchPopularTracksByGenre.rejected, (state, action) => {
                state.isFetchByGenreLoading = false;
                state.error = action.payload || "Ошибка при загрузке популярных треков по жанру";
            })

            .addCase(fetchLikedTracksByUserId.pending, (state) => {
                state.isFetchByUserLoading = true;
                state.error = null;
            })
            .addCase(fetchLikedTracksByUserId.fulfilled, (state, action) => {
                state.isFetchByUserLoading = false;
                state.likedTracks = action.payload;
                state.error = null;
            })
            .addCase(fetchLikedTracksByUserId.rejected, (state, action) => {
                state.isFetchByUserLoading = false;
                state.error = action.payload || "Ошибка при загрузке лайкнутых треков";
            })

            .addCase(fetchLikedTracksByUserIdForPlayer.pending, (state) => {
                state.isFetchByUserForPlayerLoading = true;
                state.error = null;
            })
            .addCase(fetchLikedTracksByUserIdForPlayer.fulfilled, (state, action) => {
                state.isFetchByUserForPlayerLoading = false;
                state.likedTracksForPlayer = action.payload;
                state.error = null;
            })
            .addCase(fetchLikedTracksByUserIdForPlayer.rejected, (state, action) => {
                state.isFetchByUserForPlayerLoading = false;
                state.error = action.payload || "Ошибка при загрузке лайкнутых треков";
            })
    },
});

export const { removeFromLikedTracks } = trackSlice.actions;

export default trackSlice.reducer;