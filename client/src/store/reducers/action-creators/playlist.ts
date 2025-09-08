import { createAsyncThunk } from "@reduxjs/toolkit";
import type { PlaylistSimpleDto } from "../../../models/DTO/PlaylistSimpleDto.ts";
import axios from "axios";
import type {PlaylistDto} from "../../../models/PlaylistDto.ts";

export const fetchTopPlaylistsByWeek = createAsyncThunk<
    PlaylistSimpleDto[],
    { page?: number; size?: number },
    { rejectValue: string }
>(
    'playlists/TopPlaylistsByFavorites',
    async ({ page = 0, size = 20 }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());

            const response = await axios.get(`http://localhost:8083/api/playlists/TopPlaylistsByFavorites?${params}`)
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
            const response = await axios.get(
                `http://localhost:8083/api/playlists/Dto/${playlistId}`
            );
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue('Не удалось загрузить информацию о плейлисте');
        }
    }
);