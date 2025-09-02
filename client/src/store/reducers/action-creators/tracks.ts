import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {TrackSimpleDto} from "../../../models/DTO/TrackSimpleDto.ts";

export const fetchTop20TracksByWeek = createAsyncThunk<TrackSimpleDto[]>(
    "recommendations/simpleDto/fetchTop20TracksByWeek",
    async () => {
        const response = await axios.get("http://localhost:8083/api/recommendations/simpleDto/find20MostListenedTracksByWeek");
        return response.data;
    }
);
