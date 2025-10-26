import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TrackSimpleDto } from "../../../models/DTO/track/TrackSimpleDto.ts";
import { $api, $authApi } from "../../../http";
import { setTotalPages } from "../PageSlice.ts";
import type {TrackDto} from "../../../models/TrackDto.ts";

export const fetchTopTracksByWeek = createAsyncThunk<TrackSimpleDto[],
    { page?: number; size?: number }
>(
    "tracks/MostListenedTracksOfWeek",
    async ({ page = 0, size = 20 }, { dispatch }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());

        const response = await $api.get(`/tracks/MostListenedTracksOfWeek?${params}`);
        dispatch(setTotalPages(response.data.page.totalPages))
        return response.data.page.content;
    }
);

export const fetchTrackDetails = createAsyncThunk<TrackDto,
    { trackId : number}
>
(
    "tracks/fetchTrackDetails",
    async (trackId, { rejectWithValue }) => {
        try {
            const response = await $authApi.get(`/tracks/Dto/${trackId}`);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return rejectWithValue("Не удалось загрузить информацию о треке");
        }
    }
)

export const fetchPopularTracksByAuthor = createAsyncThunk<
    TrackSimpleDto[],
    { authorId: string; page?: number; size?: number }
>(
    "tracks/ByAuthor/Popular",
    async ({ authorId, page = 0, size = 20 }, { dispatch }) => {
            const params = new URLSearchParams();
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());

            const response = await $authApi.get(
                `/tracks/ByAuthor/Popular/${authorId}?${params}`
            );

            dispatch(setTotalPages(response.data.page.totalPages))
            return response.data.page.content;
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
            `/tracks/ByAuthor/Collaborations/${authorId}?${params}`
        );
        dispatch(setTotalPages(response.data.page.totalPages))
        return response.data.page.content;
    }
);

export const fetchTracksByAlbum = createAsyncThunk<
    TrackSimpleDto[],
    { albumId: number | string, page?: number, size?: number }
>(
    "tracks/fetchTracksByAlbum",
    async ({ albumId, page = 0, size = 20 }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());


        const response = await $authApi.get(
            `/tracks/ByAlbum/${albumId}?${params}`
        );
        return response.data.page.content;
    }
)

export const likeTrack = createAsyncThunk<
    void,
    { userId : string;trackId : number },
    { rejectValue: string }
>(
    'track/likeTrack',
    async({userId,trackId},{rejectWithValue}) => {
        try {
            await $authApi.post('/tracks/like', null, {
                params: {
                    userId: userId,
                    trackId: trackId.toString()
                }
            });
        }
        catch (error: unknown)
        {
            return rejectWithValue(`Failed to like track : ${error}`);
        }
    }
);

export const fetchTracksByPlaylist = createAsyncThunk<
    TrackSimpleDto[],
    { playlistId: number | string, page?: number, size?: number }
>(
    "tracks/fetchTracksByPlaylist",
    async ({ playlistId, page = 0, size = 20 }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());


        const response = await $authApi.get(
            `/tracks/ByPlaylist/${playlistId}?${params}`
        );
        return response.data.page.content;
    }
);

export const fetchPopularTracksByGenre = createAsyncThunk<
    TrackSimpleDto[],
    { genreId: number; page?: number; size?: number },
    { rejectValue: string }
>(
    "tracks/fetchPopularTracksByGenre",
    async ({ genreId, page = 0, size = 20 }, { rejectWithValue, dispatch }) => {
        try {
            const params = new URLSearchParams();
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());

            const response = await $api.get(
                `/tracks/ByGenre/Popular/${genreId}?${params}`
            );
            dispatch(setTotalPages(response.data.page.totalPages));
            return response.data.page.content;
        } catch (e: unknown) {
            return rejectWithValue(`Не удалось загрузить треки по жанру : ${e}`);
        }
    }
);

export const fetchLikedTracksByUserId = createAsyncThunk<
    TrackSimpleDto[],
    {userId: string, page?: number; size?: number},
    {rejectValue: string}
>(
    "tracks/fetchLikedTracksByUserId",
    async({userId, page = 0, size = 20}, {rejectWithValue,dispatch}) => {
        try{
            const response = await $authApi.get(`/tracks/liked/${userId}`, {
                params: {
                    page,
                    size
                }
            });
            dispatch(setTotalPages(response.data.page.totalPages));
            return response.data.page.content;
        } catch (error: unknown) {
            console.error(`Error fetching liked tracks: ${error}`);
            return rejectWithValue(
                `Failed to fetch liked tracks: ${error}`
            );
        }
    }
);