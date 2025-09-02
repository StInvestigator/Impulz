import {createAsyncThunk} from "@reduxjs/toolkit";
import type {AlbumSimpleDto} from "../../../models/DTO/AlbumSimpleDto.ts";
import {$authApi} from "../../../http";

export const fetchAlbumsByAuthor = createAsyncThunk<
    AlbumSimpleDto[],
    {authorId: string, page?: number; size?: number},
    { rejectValue: string }
>(
    'albums/albumsByAuthor',
    async ({ authorId, page = 0, size = 20 }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());

            const response = await $authApi.get(`http://localhost:8083/api/albums/ByAuthor/${authorId}?${params}`)
            return response.data.content;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue(`Не удалось загрузить альбомы`);
        }
    }
)