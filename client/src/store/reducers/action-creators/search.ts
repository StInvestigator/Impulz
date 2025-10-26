import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authApi } from "../../../http";
import type { TrackSimpleDto } from "../../../models/DTO/track/TrackSimpleDto.ts";
import { setTotalPages } from "../PageSlice.ts";
import type { AuthorSimpleDto } from "../../../models/DTO/AuthorSimpleDto.ts";
import type { AlbumSimpleDto } from "../../../models/DTO/album/AlbumSimpleDto.ts";
import type {PlaylistDto} from "../../../models/PlaylistDto.ts";

export const searchTracks = createAsyncThunk<
    TrackSimpleDto[],
    { query: string, page?: number; size?: number },
    { rejectValue: string }
>(
    'search/searchTracks',
    async ({ query, page = 0, size = 20 }, { rejectWithValue, dispatch }) => {
        try {
            const params = new URLSearchParams();
            params.append('q', encodeURIComponent(query))
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());

            const response = await $authApi.get(`/search/tracks?${params}`);
            dispatch(setTotalPages(response.data.totalPages))
            return response.data.content;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue('Не удалось найти треки');
        }
    }
);

export const searchAuthors = createAsyncThunk<
    AuthorSimpleDto[],
    { query: string, page?: number; size?: number },
    { rejectValue: string }
>(
    'search/searchAuthors',
    async ({ query, page = 0, size = 20 }, { rejectWithValue, dispatch }) => {
        try {
            const params = new URLSearchParams();
            params.append('q', encodeURIComponent(query))
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());
            const response = await $authApi.get(`/search/authors?${params}`);
            dispatch(setTotalPages(response.data.totalPages))
            return response.data.content;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue('Не удалось найти авторов');
        }
    }
);

export const searchAlbums = createAsyncThunk<
    AlbumSimpleDto[],
    { query: string, page?: number; size?: number },
    { rejectValue: string }
>(
    'search/searchAlbums',
    async ({ query, page = 0, size = 20 }, { rejectWithValue, dispatch }) => {
        try {
            const params = new URLSearchParams();
            params.append('q', encodeURIComponent(query))
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());
            const response = await $authApi.get(`/search/albums?${params}`);
            dispatch(setTotalPages(response.data.totalPages))
            return response.data.content;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue('Не удалось найти альбомы');
        }
    }
);

export const searchPublicPlaylists = createAsyncThunk<
    PlaylistDto[],
    { query: string, page?: number; size?: number },
    { rejectValue: string }
>(
    'search/searchPublicPlaylists',
    async ({ query, page = 0, size = 20 }, { rejectWithValue, dispatch }) => {
        try {
            const params = new URLSearchParams();
            params.append('q', encodeURIComponent(query))
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());
            const response = await $authApi.get(`/search/playlists/public?${params}`);
            dispatch(setTotalPages(response.data.totalPages))
            return response.data.content;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue('Не удалось найти плейлисты');
        }
    }
);