import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthorDetails, fetchTop20AuthorsByMonth } from "./action-creators/author.ts";
import type { AuthorSimpleDto } from "../../models/DTO/AuthorSimpleDto.ts";
import type { AuthorDto } from "../../models/AuthorDto.ts";

interface AuthorState {
    topAuthors: AuthorSimpleDto[];
    currentAuthor: AuthorDto | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthorState = {
    topAuthors: [],
    currentAuthor: null,
    isLoading: false,
    error: null,
};

const authorSlice = createSlice({
    name: "author",
    initialState,
    reducers: {
        clearCurrentAuthor: (state) => {
            state.currentAuthor = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTop20AuthorsByMonth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTop20AuthorsByMonth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.topAuthors = action.payload;
                state.error = null;
            })
            .addCase(fetchTop20AuthorsByMonth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при загрузке авторов";
            })

            .addCase(fetchAuthorDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAuthorDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentAuthor = action.payload;
                state.error = null;
            })
            .addCase(fetchAuthorDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при загрузке информации об авторе";
            });
    },
});

export const { clearCurrentAuthor } = authorSlice.actions;
export default authorSlice.reducer;