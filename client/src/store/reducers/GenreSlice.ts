import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { GenreSimpleDto } from "../../models/DTO/GenreSimpleDto";
import { fetchTop5Genres } from "./action-creators/genre";

interface GenreState {
    topFiveGenres: GenreSimpleDto[];
    isLoading: boolean;
    error: string | null;
}

const initialState: GenreState = {
    topFiveGenres: [],
    isLoading: false,
    error: null
}

export const GenreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTop5Genres.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTop5Genres.fulfilled, (state, action: PayloadAction<GenreSimpleDto[]>) => {
                state.isLoading = false;
                state.topFiveGenres = action.payload;
            })
            .addCase(fetchTop5Genres.rejected, (state, action: ReturnType<typeof fetchTop5Genres.rejected>) => {
                state.isLoading = false;
                state.error = action.payload || "Unknown error";
            });
    }
})

export default GenreSlice.reducer