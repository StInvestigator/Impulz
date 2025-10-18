import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthorSimpleDto } from "../../../models/DTO/AuthorSimpleDto";
import {$api, $authApi} from "../../../http";
import type { AuthorDto } from "../../../models/AuthorDto.ts";
import { setTotalPages } from "../PageSlice.ts";

export const fetchTopAuthorsByMonth = createAsyncThunk<AuthorSimpleDto[],
    { page?: number; size?: number }
>(
    "authors/BestAuthorsOfMonth",
    async ({ page = 0, size }, { dispatch }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());

        const response = await $api.get(
            `/authors/BestAuthorsOfMonth?${params}`
        );
        dispatch(setTotalPages(response.data.totalPages))
        return response.data.content;
    }
);

export const fetchTopAuthorsInGenre = createAsyncThunk<AuthorSimpleDto[],
    {genreId: number, page?: number; size?: number }
>(
    "authors/BestAuthorsInGenre",
    async ({ genreId, page = 0, size = 20 }, { dispatch }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());

        const response = await $api.get(
            `/authors/TopInGenre/${genreId}?${params}`
        );
        dispatch(setTotalPages(response.data.totalPages))
        return response.data.content;
    }
);

export const fetchAuthorDetails = createAsyncThunk<AuthorDto, string>(
    "author/fetchAuthorDetails",
    async (authorId) => {
        const response = await $authApi.get(
            `/authors/Dto/${authorId}`
        );
        return response.data;
    }
);

export const fetchSimilarAuthorsByGenre = createAsyncThunk<AuthorSimpleDto[],
    { authorId: string,page?: number; size?: number }
>(
    "authors/SimilarAuthorsByGenre",
    async({authorId,page = 0,size = 20}, {dispatch}) => {
            const params = new URLSearchParams();
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());
            const response = await $authApi.get(
                `http://localhost:8083/api/authors/SimilarByGenres/${authorId}?${params}`
            );
            dispatch(setTotalPages(response.data.totalPages))
            return response.data.content;
    }
)

export const fetchAuthorPlaysByMonth = createAsyncThunk<number, string>(
    "author/fetchAuthorPlaysByMonth",
    async (authorId) => {
        const response = await $authApi.get<number>(
            `http://localhost:8083/api/authors/getCountAuthorPlaysByMonth/${authorId}`
        );
        return response.data;
    }
);

// store/reducers/action-creators/author.ts
export const subscribeToAuthor = createAsyncThunk<
    boolean,
    string,
    { rejectValue: string }
>(
    "author/subscribe",
    async (authorId, { rejectWithValue }) => {
        try {
            await $authApi.post(`http://localhost:8083/api/authors/${authorId}/subscribe`);
            return true;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue("Не удалось подписаться на автора");
        }
    }
);

export const unsubscribeFromAuthor = createAsyncThunk<
    boolean,
    string,
    { rejectValue: string }
>(
    "author/unsubscribe",
    async (authorId, { rejectWithValue }) => {
        try {
            await $authApi.delete(`http://localhost:8083/api/authors/${authorId}/unsubscribe`);
            return false;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue("Не удалось отписаться от автора");
        }
    }
);

export const checkSubscriptionStatus = createAsyncThunk<
    boolean,
    string,
    { rejectValue: string }
>(
    "author/checkSubscription",
    async (authorId, { rejectWithValue }) => {
        try {
            const response = await $authApi.get(`http://localhost:8083/api/authors/${authorId}/subscription-status`);
            return response.data.isSubscribed;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue("Не удалось проверить статус подписки");
        }
    }
);

export const befomeAuthor = createAsyncThunk<void, string, { rejectValue: string }>(
    "author/befomeAuthor",
    async (userId, { rejectWithValue }) => {
        try {
            await $authApi.get(`http://localhost:8083/api/authors/becomeAuthor/${userId}`);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue("Не удалось стать автором");
        }
    }
);
