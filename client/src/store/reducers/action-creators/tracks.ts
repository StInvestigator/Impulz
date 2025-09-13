import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TrackSimpleDto } from "../../../models/DTO/TrackSimpleDto.ts";
import { $authApi } from "../../../http";
// import { useAppDispatch } from "../../../hooks/redux.ts";
import { setTotalPages } from "../PageSlice.ts";

export const fetchTopTracksByWeek = createAsyncThunk<TrackSimpleDto[],
    { page?: number; size?: number }
>(
    "tracks/MostListenedTracksOfWeek",
    async ({ page = 0, size = 20 }, { dispatch }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());

        const response = await axios.get(`http://localhost:8083/api/tracks/MostListenedTracksOfWeek?${params}`);
        dispatch(setTotalPages(response.data.totalPages))
        return response.data.content;
    }
);

export const fetchPopularTracksByAuthor = createAsyncThunk<
    TrackSimpleDto[],
    { authorId: string; page?: number; size?: number }
>(
    "tracks/ByAuthor/Popular",
    async ({ authorId, page = 0, size = 20 }, { dispatch }) => {
        // const dispatch = useAppDispatch();
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());

        const response = await $authApi.get(
            `http://localhost:8083/api/tracks/ByAuthor/Popular/${authorId}?${params}`
        );
        dispatch(setTotalPages(response.data.totalPages))
        return response.data.content;
    }
);

export const fetchAuthorTrackCollaborations = createAsyncThunk<
    TrackSimpleDto[],
    { authorId: string; page?: number; size?: number }
>(
    "tracks/fetchAuthorCollaborations",
    async ({ authorId, page = 0, size = 20 }, { dispatch }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());

        const response = await $authApi.get(
            `http://localhost:8083/api/tracks/ByAuthor/Collaborations/${authorId}?${params}`
        );
        dispatch(setTotalPages(response.data.totalPages))
        return response.data.content;
    }
);

export const fetchTracksByAlbum = createAsyncThunk<
    TrackSimpleDto[],
    {albumId: number,page?: number,size?: number}
>(
    "tracks/fetchTracksByAlbum",
    async({albumId,page = 0,size = 20}) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());

        const response = await $authApi.get(
            `http://localhost:8083/api/tracks/ByAlbum/${albumId}?${params}`
        );
        return response.data.content;
    }
)
