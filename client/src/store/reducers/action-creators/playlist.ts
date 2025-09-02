import {createAsyncThunk} from "@reduxjs/toolkit";
import type { PlaylistSimpleDto } from "../../../models/DTO/PlaylistSimpleDto.ts";
import axios from "axios";

export const fetchTop20PlaylistsByWeek = createAsyncThunk<
    PlaylistSimpleDto[],
    void,
    { rejectValue: string }
>(
    'recommendations/simpleDto/fetchTop20PlaylistsByWeek',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get<PlaylistSimpleDto[]>("http://localhost:8083/api/recommendations/simpleDto/findTop20PlaylistsByFavorites")
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue("Не удалось загрузить плейлисты");
        }
    }
)