import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthorSimpleDto } from "../../../models/DTO/AuthorSimpleDto";
import { $authApi } from "../../../http";

export const fetchTop20AuthorsByMonth = createAsyncThunk<AuthorSimpleDto[]>(
    "recommendations/simpleDto/fetchTop20AuthorsByMonth",
    async () => {
        const response = await $authApi.get("http://localhost:8083/api/recommendations/simpleDto/findTop20AuthorsOfMonth");
        return response.data;
    }
);