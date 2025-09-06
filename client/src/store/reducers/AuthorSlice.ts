import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthorDetails, fetchTopAuthorsByMonth, fetchTopAuthorsInGenre } from "./action-creators/author.ts";
import type { AuthorSimpleDto } from "../../models/DTO/AuthorSimpleDto.ts";
import type { AuthorDto } from "../../models/AuthorDto.ts";
import type { AuthorKeys } from "../../models/type/ModelKeys.ts";

interface AuthorState {
    authorsByKey: Record<AuthorKeys, AuthorSimpleDto[]>;
    currentAuthor: AuthorDto | null;
    isLoading: Record<AuthorKeys, boolean>;
    error: Record<AuthorKeys, string | null>;
    currentAuthorLoading: boolean;
    currentAuthorError: string | null;
}

const initialState: AuthorState = {
    currentAuthor: null,
    authorsByKey: {
        topAuthorsByMonth: [],
        topAuthorsInGenre: [],
    },
    isLoading: {
        topAuthorsByMonth: false,
        topAuthorsInGenre: false,
    },
    error: {
        topAuthorsByMonth: null,
        topAuthorsInGenre: null,
    },
    currentAuthorLoading: false,
    currentAuthorError: null,
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
            .addCase(fetchTopAuthorsByMonth.pending, (state) => {
                state.isLoading.topAuthorsByMonth = true;
            })
            .addCase(fetchTopAuthorsByMonth.fulfilled, (state, action) => {
                state.isLoading.topAuthorsByMonth = false;
                state.authorsByKey.topAuthorsByMonth = action.payload;
                state.error.topAuthorsByMonth = null;
            })
            .addCase(fetchTopAuthorsByMonth.rejected, (state, action) => {
                state.isLoading.topAuthorsByMonth = false;
                state.error.topAuthorsByMonth = action.error.message || "Ошибка при загрузке авторов";
            })

            .addCase(fetchTopAuthorsInGenre.pending, (state) => {
                state.isLoading.topAuthorsInGenre = true;
            })
            .addCase(fetchTopAuthorsInGenre.fulfilled, (state, action) => {
                state.isLoading.topAuthorsInGenre = false;
                state.authorsByKey.topAuthorsInGenre = action.payload;
                state.error.topAuthorsInGenre = null;
            })
            .addCase(fetchTopAuthorsInGenre.rejected, (state, action) => {
                state.isLoading.topAuthorsInGenre = false;
                state.error.topAuthorsInGenre = action.error.message || "Ошибка при загрузке авторов";
            })

            .addCase(fetchAuthorDetails.pending, (state) => {
                state.currentAuthorLoading = true;
            })
            .addCase(fetchAuthorDetails.fulfilled, (state, action) => {
                state.currentAuthorLoading = false;
                state.currentAuthor = action.payload;
                state.currentAuthorError = null;
            })
            .addCase(fetchAuthorDetails.rejected, (state, action) => {
                state.currentAuthorLoading = false;
                state.currentAuthorError = action.error.message || "Ошибка при загрузке информации об авторе";
            });
    },
});

export const { clearCurrentAuthor } = authorSlice.actions;
export default authorSlice.reducer;