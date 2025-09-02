import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GenreSimpleDto } from "../../../models/DTO/GenreSimpleDto";
import { $authApi } from "../../../http";

export const fetchTop5Genres = createAsyncThunk<
    GenreSimpleDto[],
    void,
    { rejectValue: string }
>(
    'genres/simpleDto/findTop5Genres',
    async (_, {rejectWithValue}) => {
        try {
            const response = await $authApi.get<GenreSimpleDto[]>("http://localhost:8083/api/genres/simpleDto/findTop5Genres")
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue("Не удалось загрузить жанры");
        }
    }
)