import { createSlice } from "@reduxjs/toolkit";
import {fetchTopTracksByWeek, fetchPopularTracksByAuthor, fetchAuthorTrackCollaborations} from "./action-creators/tracks.ts";
import type { TrackSimpleDto } from "../../models/DTO/TrackSimpleDto.ts";

interface TrackState {
    topTracks: TrackSimpleDto[];
    popularTracks: TrackSimpleDto[];
    collaborationTracks: TrackSimpleDto[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TrackState = {
    topTracks: [],
    popularTracks: [],
    collaborationTracks: [],
    isLoading: false,
    error: null,
};

const trackSlice = createSlice({
    name: "track",
    initialState,
    reducers: {},
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
                state.isLoading = true;
            })
            .addCase(fetchPopularTracksByAuthor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.popularTracks = action.payload;
                state.error = null;
            })
            .addCase(fetchPopularTracksByAuthor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при загрузке популярных треков автора";
            })

            .addCase(fetchAuthorTrackCollaborations.pending, (state) => {
            state.isLoading = true;
            })
            .addCase(fetchAuthorTrackCollaborations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.collaborationTracks = action.payload;
                state.error = null;
            })
            .addCase(fetchAuthorTrackCollaborations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при загрузке коллабораций";
            });
    },
});

export default trackSlice.reducer;