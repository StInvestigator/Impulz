import { createAsyncThunk } from "@reduxjs/toolkit";
import type {GlobalSearchResult} from "../../../models/document/GlobalSearchResult.ts";
import {$authApi} from "../../../http";
import type {TrackDocument} from "../../../models/document/TrackDocument.ts";
import type {AuthorDocument} from "../../../models/document/AuthorDocument.ts";
import type {AlbumDocument} from "../../../models/document/AlbumDocument.ts";
import type {PlaylistDocument} from "../../../models/document/PlaylistDocument.ts";

export const searchAll = createAsyncThunk<
    GlobalSearchResult,
    string,
    { rejectValue: string }
>(
    'search/searchAll',
    async (query, { rejectWithValue }) => {
        try {
            const response = await $authApi.get(`/search?q=${encodeURIComponent(query)}`);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue('Не удалось выполнить поиск');
        }
    }
);

export const searchTracks = createAsyncThunk<
    TrackDocument[],
    string,
    { rejectValue: string }
>(
    'search/searchTracks',
    async (query, { rejectWithValue }) => {
        try {
            const response = await $authApi.get(`/search/tracks?q=${encodeURIComponent(query)}`);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue('Не удалось найти треки');
        }
    }
);

export const searchAuthors = createAsyncThunk<
    AuthorDocument[],
    string,
    { rejectValue: string }
>(
    'search/searchAuthors',
    async (query, { rejectWithValue }) => {
        try {
            const response = await $authApi.get(`/search/authors?q=${encodeURIComponent(query)}`);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue('Не удалось найти авторов');
        }
    }
);

export const searchAlbums = createAsyncThunk<
    AlbumDocument[],
    string,
    { rejectValue: string }
>(
    'search/searchAlbums',
    async (query, { rejectWithValue }) => {
        try {
            const response = await $authApi.get(`/search/albums?q=${encodeURIComponent(query)}`);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue('Не удалось найти альбомы');
        }
    }
);

export const searchPublicPlaylists = createAsyncThunk<
    PlaylistDocument[],
    string,
    { rejectValue: string }
>(
    'search/searchPublicPlaylists',
    async (query, { rejectWithValue }) => {
        try {
            const response = await $authApi.get(`/search/playlists/public?q=${encodeURIComponent(query)}`);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue('Не удалось найти плейлисты');
        }
    }
);