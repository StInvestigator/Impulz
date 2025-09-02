import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthorSimpleDto } from "../../../models/DTO/AuthorSimpleDto";
import axios from "axios";
import {$authApi} from "../../../http";
import type {AuthorDto} from "../../../models/AuthorDto.ts";

export const fetchTop20AuthorsByMonth = createAsyncThunk<AuthorSimpleDto[]>(
    "recommendations/simpleDto/fetchTop20AuthorsByMonth",
    async () => {
        const response = await axios.get("http://localhost:8083/api/recommendations/simpleDto/findTop20AuthorsOfMonth");
        return response.data;
    }
);

export const fetchAuthorDetails = createAsyncThunk<AuthorDto, string>(
    "author/fetchAuthorDetails",
    async (authorId) => {
        const response = await $authApi.get(
            `http://localhost:8083/api/authors/Dto/${authorId}`
        );
        return response.data;
    }
);

