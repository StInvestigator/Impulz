import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {ITrackDTO} from "../../../models/DTO/TrackSimpleDto.ts";

export const fetchTop20TracksByWeek = createAsyncThunk<ITrackDTO[]>(
    "track/fetchTop20TracksByWeek",
    async () => {
        const response = await axios.get("http://localhost:8083/api/track/get20MostListenedTracksByWeek");
        return response.data;
    }
);
