import { createSlice } from "@reduxjs/toolkit";
import type { MediaItemSimpleDto } from "../../models/DTO/MediaItemSimpleDto";
import {fetchMixedRecommendations, refreshMixedRecommendations} from "./action-creators/recommendation.ts";

interface RecommendationsState {
    items: MediaItemSimpleDto[];
    isLoading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
    isRefreshing: boolean;
}

const initialState: RecommendationsState = {
    items: [],
    isLoading: false,
    error: null,
    page: 0,
    hasMore: true,
    isRefreshing: false,
};

const RecommendationsSlice = createSlice({
    name: "mixedRecommendations",
    initialState,
    reducers: {
        clearRecommendations: (state) => {
            state.items = [];
            state.page = 0;
            state.hasMore = true;
            state.error = null;
        },
        setRecommendationsPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMixedRecommendations.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMixedRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.meta.arg.page === 0) {
                    state.items = action.payload;
                } else {
                    state.items = [...state.items, ...action.payload];
                }
                state.page = action.meta.arg.page || 0;
                state.hasMore = action.payload.length > 0;
                state.error = null;
            })
            .addCase(fetchMixedRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при загрузке смешанных рекомендаций";
            })

            .addCase(refreshMixedRecommendations.pending, (state) => {
                state.isRefreshing = true;
                state.error = null;
            })
            .addCase(refreshMixedRecommendations.fulfilled, (state, action) => {
                state.isRefreshing = false;
                state.items = action.payload;
                state.page = 0;
                state.hasMore = action.payload.length > 0;
                state.error = null;
            })
            .addCase(refreshMixedRecommendations.rejected, (state, action) => {
                state.isRefreshing = false;
                state.error = action.error.message || "Ошибка при обновлении рекомендаций";
            });
    },
});

export const { clearRecommendations, setRecommendationsPage } = RecommendationsSlice.actions;
export default RecommendationsSlice.reducer;