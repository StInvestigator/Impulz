import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {TrackSimpleDto} from "../../../models/DTO/TrackSimpleDto.ts";
import {$authApi} from "../../../http";

export const fetchTop20TracksByWeek = createAsyncThunk<TrackSimpleDto[]>(
    "recommendations/simpleDto/fetchTop20TracksByWeek",
    async () => {
        const response = await axios.get("http://localhost:8083/api/recommendations/simpleDto/find20MostListenedTracksByWeek");
        return response.data;
    }
);

export const fetchPopularTracksByAuthor = createAsyncThunk<
    TrackSimpleDto[],
    { authorId: string; page?: number; size?: number }
>(
    "tracks/PopularByAuthor",
    async ({ authorId, page = 0, size = 20 }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());

        const response = await $authApi.get(
            `http://localhost:8083/api/tracks/PopularByAuthor/${authorId}?${params}`
        );
        return response.data.content;
    }
);
