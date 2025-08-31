import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthorSimpleDto } from "../../../models/DTO/AuthorSimpleDto";
import { $authApi } from "../../../http";

export const fetchTop20AuthorsByWeek = createAsyncThunk<AuthorSimpleDto[]>(
    "author/simpleDto/fetchTop20AuthorsByWeek",
    async () => {
        const response = await $authApi.get("http://localhost:8083/api/author/simpleDto/findTop20AuthorsOfMonth");
        return response.data;
    }
);