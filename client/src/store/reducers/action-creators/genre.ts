import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GenreSimpleDto } from "../../../models/DTO/GenreSimpleDto";
import { setTotalPages } from "../PageSlice";
import {$api} from "../../../http";

export const fetchTopGenres = createAsyncThunk<
    GenreSimpleDto[],
    {page?: number; size?: number},
    { rejectValue: string }
>(
    'genres/TopGenres',
    async ({ page = 0, size = 5 }, { rejectWithValue, dispatch }) => {
        try {
            const params = new URLSearchParams();
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());

            const response = await $api.get(`/genres/TopGenres?${params}`)
            dispatch(setTotalPages(response.data.totalPages))
            return response.data.content;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue(`Не удалось загрузить жанры`);
        }
    }
)

export const fetchAllGenres = createAsyncThunk<
    GenreSimpleDto[],
    void,
    { rejectValue: string }
>(
    'genres/All',
    async (_: void, { rejectWithValue }) => {
        try {
            const response = await $api.get(`/genres/all`);
            return response.data as GenreSimpleDto[];
        } catch (e: unknown) {
            return rejectWithValue(`Не удалось загрузить все жанры ${e}`);
        }
    }
)