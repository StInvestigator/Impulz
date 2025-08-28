import { createSlice } from "@reduxjs/toolkit";
import { fetchTop20TracksByWeek} from "./action-creators/tracks.ts";
import type { ITrackDTO} from "../../models/DTO/ITrackDTO.ts";

interface TrackState {
    topTracks: ITrackDTO[];
    loading: boolean;
    error: string | null;
}

const initialState: TrackState = {
    topTracks: [],
    loading: false,
    error: null,
};

const trackSlice = createSlice({
    name: "track",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTop20TracksByWeek.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTop20TracksByWeek.fulfilled, (state, action) => {
                state.loading = false;
                state.topTracks = action.payload;
            })
            .addCase(fetchTop20TracksByWeek.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка при загрузке треков";
            });
    },
});

export default trackSlice.reducer;
