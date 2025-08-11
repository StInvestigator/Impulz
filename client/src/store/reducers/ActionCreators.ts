import {createAsyncThunk} from "@reduxjs/toolkit";
import type {IPlaylist} from "../../models/IPlaylist.ts";
import {$authApi} from "../../http";

export const fetchPlaylists = createAsyncThunk<
    IPlaylist[],
    void,
    { rejectValue: string }
>(
    'playlist/fetchAll',
    async (_, {rejectWithValue}) => {
        try {
            const response = await $authApi.get<IPlaylist[]>("http://localhost:8083/api/playlists/")
            return response.data;
        } catch (e) {
            return rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)