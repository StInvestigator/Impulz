import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../../http";
import {setTotalPages} from "../PageSlice.ts";
import type {MediaItemSimpleDto} from "../../../models/DTO/MediaItemSimpleDto.ts";

export const fetchMixedRecommendations = createAsyncThunk<
    MediaItemSimpleDto[],
    { page?: number; size?: number }
>(
    "mixedRecommendations/fetch",
    async ({ page = 0, size = 10 }, { dispatch }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());

        const response = await $api.get(
            `/Recommendations/MixedToday?${params}`
        );
        dispatch(setTotalPages(response.data.totalPages));
        return response.data.content;
    }
);

export const refreshMixedRecommendations = createAsyncThunk<
    MediaItemSimpleDto[],
    void
>(
    "mixedRecommendations/refresh",
    async (_, { dispatch }) => {
        const response = await $api.get(
            `/Recommendations/MixedToday?page=0&size=10`
        );
        dispatch(setTotalPages(response.data.totalPages));
        return response.data.content;
    }
);