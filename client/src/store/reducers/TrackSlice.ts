import { createSlice } from "@reduxjs/toolkit";
import { fetchTop20TracksByWeek} from "./action-creators/tracks.ts";
import type { TrackSimpleDto} from "../../models/DTO/TrackSimpleDto.ts";

interface TrackState {
    topTracks: TrackSimpleDto[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TrackState = {
    topTracks: [],
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
            })
            .addCase(fetchTop20TracksByWeek.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при загрузке треков";
            });
    },
});

export default trackSlice.reducer;
