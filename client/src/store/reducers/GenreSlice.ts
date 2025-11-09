import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GenreSimpleDto } from "../../models/DTO/GenreSimpleDto";
import { fetchTopGenres, fetchAllGenres, fetchGenre } from "./action-creators/genre";

interface GenreState {
    topFiveGenres: GenreSimpleDto[];
    allGenres: GenreSimpleDto[];
    currentGenre: GenreSimpleDto | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: GenreState = {
    topFiveGenres: [],
    allGenres: [],
    currentGenre: null,
    isLoading: false,
    error: null
}

export const GenreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopGenres.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTopGenres.fulfilled, (state, action: PayloadAction<GenreSimpleDto[]>) => {
                state.isLoading = false;
                state.topFiveGenres = action.payload;
            })
            .addCase(fetchTopGenres.rejected, (state, action: ReturnType<typeof fetchTopGenres.rejected>) => {
                state.isLoading = false;
                state.error = action.payload || "Unknown error";
            })

            .addCase(fetchGenre.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGenre.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentGenre = action.payload;
                state.error = null;
            })
            .addCase(fetchGenre.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при загрузке информации об жанре";
            })

            .addCase(fetchAllGenres.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllGenres.fulfilled, (state, action: PayloadAction<GenreSimpleDto[]>) => {
                state.isLoading = false;
                state.allGenres = action.payload;
            })
            .addCase(fetchAllGenres.rejected, (state, action: ReturnType<typeof fetchAllGenres.rejected>) => {
                state.isLoading = false;
                state.error = action.payload || "Unknown error";
            });
    }
})

export default GenreSlice.reducer