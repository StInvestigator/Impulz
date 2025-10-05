import { createAsyncThunk } from "@reduxjs/toolkit";
import type { PlaylistSimpleDto } from "../../../models/DTO/PlaylistSimpleDto.ts";
import type {PlaylistDto} from "../../../models/PlaylistDto.ts";
import {$api, $authApi} from "../../../http";
import { setTotalPages } from "../PageSlice.ts";

export const fetchTopPlaylistsByWeek = createAsyncThunk<
    PlaylistSimpleDto[],
    { page?: number; size?: number },
    { rejectValue: string }
>(
    'playlists/TopPlaylistsByFavorites',
    async ({ page = 0, size = 20 }, { rejectWithValue, dispatch }) => {
        try {
            const params = new URLSearchParams();
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());

            const response = await $api.get(`/playlists/TopPlaylistsByFavorites?${params}`)
            dispatch(setTotalPages(response.data.totalPages))
            return response.data.content;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue(`Не удалось загрузить плейлисты:`);
        }
    }
);

export const fetchPlaylistDetails = createAsyncThunk<
    PlaylistDto,
    string,
    { rejectValue: string }
>(
    "playlists/fetchPlaylistDetails",
    async (playlistId, { rejectWithValue }) => {
        try {
            const response = await $authApi.get(
                `/playlists/Dto/${playlistId}`
            );
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue('Не удалось загрузить информацию о плейлисте');
        }
    }
);

export const createPlaylist = createAsyncThunk<
    PlaylistDto,
    { name: string; isPublic: boolean; userId: string; imageFile?: File },
    { rejectValue: string }
>(
    'playlists/createPlaylist',
    async ({ name, isPublic, userId, imageFile }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('title', name);
            formData.append('userId', userId);
            formData.append('isPublic', isPublic.toString());

            if (imageFile) {
                formData.append('img', imageFile);
            }

            const response = await $authApi.post('/playlists/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue('Не удалось создать плейлист');
        }
    }
);