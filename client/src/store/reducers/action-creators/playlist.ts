import {createAsyncThunk} from "@reduxjs/toolkit";
import type {PlaylistDto} from "../../../models/PlaylistDto.ts";
import {$authApi} from "../../../http/index.ts";

export const fetchPlaylists = createAsyncThunk<
    PlaylistDto[],
    void,
    { rejectValue: string }
>(
    'playlist/fetchAll',
    async (_, {rejectWithValue}) => {
        try {
            const response = await $authApi.get<PlaylistDto[]>("/api/playlists/")
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue("Не удалось загрузить пользователей");
        }
    }
)