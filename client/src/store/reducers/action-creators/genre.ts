import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GenreSimpleDto } from "../../../models/DTO/GenreSimpleDto";
import axios from "axios";
// import { useAppDispatch } from "../../../hooks/redux";
import { setTotalPages } from "../PageSlice";

export const fetchTopGenres = createAsyncThunk<
    GenreSimpleDto[],
    {page?: number; size?: number},
    { rejectValue: string }
>(
    'genres/TopGenres',
    async ({ page = 0, size = 5 }, { rejectWithValue }) => {
        try {
            // const dispatch = useAppDispatch();
            const params = new URLSearchParams();
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());

            const response = await axios.get(`http://localhost:8083/api/genres/TopGenres?${params}`)
            setTotalPages(response.data.totalPages)
            return response.data.content;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue(`Не удалось загрузить жанры`);
        }
    }
)