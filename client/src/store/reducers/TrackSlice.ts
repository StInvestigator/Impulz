import { createSlice } from "@reduxjs/toolkit";
import { fetchTop20TracksByWeek, fetchPopularTracksByAuthor } from "./action-creators/tracks.ts";
import type { TrackSimpleDto } from "../../models/DTO/TrackSimpleDto.ts";

interface TrackState {
    topTracks: TrackSimpleDto[];
    popularTracks: TrackSimpleDto[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TrackState = {
    topTracks: [],
    popularTracks: [],
    isLoading: false,
    error: null,
};

const trackSlice = createSlice({
    name: "track",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTop20TracksByWeek.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTop20TracksByWeek.fulfilled, (state, action) => {
                state.isLoading = false;
                state.topTracks = action.payload;
                state.error = null;
            })
            .addCase(fetchTop20TracksByWeek.rejected, (state, action) => {
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
            });
    },
});

export default trackSlice.reducer;