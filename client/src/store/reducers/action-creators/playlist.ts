import { createAsyncThunk } from "@reduxjs/toolkit";
import type { PlaylistSimpleDto } from "../../../models/DTO/PlaylistSimpleDto.ts";
import axios from "axios";
// import { useAppDispatch } from "../../../hooks/redux.ts";
// import { setTotalPages } from "../PageSlice.ts";

export const fetchTopPlaylistsByWeek = createAsyncThunk<
    PlaylistSimpleDto[],
    { page?: number; size?: number },
    { rejectValue: string }
>(
    'playlists/TopPlaylistsByFavorites',
    async ({ page = 0, size = 20 }, { rejectWithValue }) => {
        try {
            // const dispatch = useAppDispatch();
            const params = new URLSearchParams();
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());

            const response = await axios.get(`http://localhost:8083/api/playlists/TopPlaylistsByFavorites?${params}`)
            // dispatch(setTotalPages(response.data.totalPages))
            return response.data.content;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue(`Не удалось загрузить плейлисты:`);
        }
    }
)