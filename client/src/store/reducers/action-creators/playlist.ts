import {createAsyncThunk} from "@reduxjs/toolkit";
import {$authApi} from "../../../http/index.ts";
import type { PlaylistSimpleDto } from "../../../models/DTO/PlaylistSimpleDto.ts";

export const fetchTop20PlaylistsByWeek = createAsyncThunk<
    PlaylistSimpleDto[],
    void,
    { rejectValue: string }
>(
    'playlist/simpleDto/fetchTop20PlaylistsByWeek',
    async (_, {rejectWithValue}) => {
        try {
            const response = await $authApi.get<PlaylistSimpleDto[]>("http://localhost:8083/api/playlist/simpleDto/findTop20PlaylistsByFavorites")
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue("Не удалось загрузить плейлисты");
        }
    }
)