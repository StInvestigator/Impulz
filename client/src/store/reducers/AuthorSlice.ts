import { createSlice } from "@reduxjs/toolkit";
import {
    fetchAuthorDetails,
    fetchAuthorPlaysByMonth,
    fetchSimilarAuthorsByGenre,
    fetchTopAuthorsByMonth,
    fetchTopAuthorsInGenre,
    subscribeToAuthor,
    unsubscribeFromAuthor,
    checkSubscriptionStatus
} from "./action-creators/author.ts";
import type { AuthorSimpleDto } from "../../models/DTO/AuthorSimpleDto.ts";
import type { AuthorDto } from "../../models/AuthorDto.ts";

interface AuthorState {
    topAuthors: AuthorSimpleDto[];
    currentAuthor: AuthorDto | null;
    similarAuthors: AuthorSimpleDto[];
    topAuthorsInGenre: AuthorSimpleDto[];
    playsByMonth: number | null;
    isLoading: boolean;
    error: string | null;

    subscriptionStatus: { [key: string]: boolean };
    subscriptionLoading: boolean;
    subscriptionError: string | null;
}

const initialState: AuthorState = {
    topAuthors: [],
    currentAuthor: null,
    similarAuthors: [],
    topAuthorsInGenre: [],
    playsByMonth: null,
    isLoading: false,
    error: null,

    subscriptionStatus: {},
    subscriptionLoading: false,
    subscriptionError: null
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
                state.isLoading = true;
            })
            .addCase(fetchTopAuthorsByMonth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.topAuthors = action.payload;
                state.error = null;
            })
            .addCase(fetchTopAuthorsByMonth.rejected, (state, action) => {
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
            })

            .addCase(fetchSimilarAuthorsByGenre.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(fetchSimilarAuthorsByGenre.fulfilled,(state,action) =>{
              state.isLoading = false;
              state.similarAuthors = action.payload;
              state.error = null;
            })
            .addCase(fetchSimilarAuthorsByGenre.rejected,(state,action) =>{
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при загрузке похожих авторов";
            })

            .addCase(fetchAuthorPlaysByMonth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAuthorPlaysByMonth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.playsByMonth = action.payload;
                state.error = null;
            })
            .addCase(fetchAuthorPlaysByMonth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при загрузке количества прослушиваний";
            })

            .addCase(subscribeToAuthor.pending, (state) => {
                state.subscriptionLoading = true;
                state.subscriptionError = null;
            })
            .addCase(subscribeToAuthor.fulfilled, (state, action) => {
                state.subscriptionLoading = false;
                state.subscriptionStatus[action.meta.arg] = true;
            })
            .addCase(subscribeToAuthor.rejected, (state, action) => {
                state.subscriptionLoading = false;
                state.subscriptionError = action.payload || "Ошибка подписки";
            })

            .addCase(unsubscribeFromAuthor.pending, (state) => {
                state.subscriptionLoading = true;
                state.subscriptionError = null;
            })
            .addCase(unsubscribeFromAuthor.fulfilled, (state, action) => {
                state.subscriptionLoading = false;
                state.subscriptionStatus[action.meta.arg] = false;
            })
            .addCase(unsubscribeFromAuthor.rejected, (state, action) => {
                state.subscriptionLoading = false;
                state.subscriptionError = action.payload || "Ошибка отписки";
            })

            .addCase(checkSubscriptionStatus.fulfilled, (state, action) => {
                state.subscriptionStatus[action.meta.arg] = action.payload;
            })
            .addCase(checkSubscriptionStatus.rejected, (state, action) => {
                state.subscriptionError = action.payload || "Ошибка проверки подписки";
            })

            .addCase(fetchTopAuthorsInGenre.pending,(state) =>{
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTopAuthorsInGenre.fulfilled,(state,action) =>{
                state.isLoading = false;
                state.topAuthorsInGenre = action.payload;
                state.error = null;
            })
            .addCase(fetchTopAuthorsInGenre.rejected,(state,action)=>{
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при загрузке топ авторов по жанру";
            });
    },
});

export const { clearCurrentAuthor } = authorSlice.actions;
export default authorSlice.reducer;