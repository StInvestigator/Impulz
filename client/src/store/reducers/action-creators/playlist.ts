import {createAsyncThunk} from "@reduxjs/toolkit";
import type {IPlaylist} from "../../../models/IPlaylist.ts";
import {$authApi} from "../../../http/index.ts";

export const fetchPlaylists = createAsyncThunk<
    IPlaylist[],
    void,
    { rejectValue: string }
>(
    'playlist/fetchAll',
    async (_, {rejectWithValue}) => {
        try {
            const response = await $authApi.get<IPlaylist[]>("/api/playlists/")
            return response.data;
        } catch (e) {
            return rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)