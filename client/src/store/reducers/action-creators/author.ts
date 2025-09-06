import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthorSimpleDto } from "../../../models/DTO/AuthorSimpleDto";
import axios from "axios";
import { $authApi } from "../../../http";
import type { AuthorDto } from "../../../models/AuthorDto.ts";

export const fetchTopAuthorsByMonth = createAsyncThunk<AuthorSimpleDto[],
    { page?: number; size?: number }
>(
    "authors/BestAuthorsOfMonth",
    async ({ page = 0, size = 20 }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());

        const response = await axios.get(
            `http://localhost:8083/api/authors/BestAuthorsOfMonth?${params}`
        );
        return response.data.content;
    }
);

export const fetchTopAuthorsInGenre = createAsyncThunk<AuthorSimpleDto[],
    {genreId: number, page?: number; size?: number }
>(
    "authors/BestAuthorsInGenre",
    async ({ genreId, page = 0, size = 20 }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append('page', page.toString());
        if (size !== undefined) params.append('size', size.toString());

        const response = await $authApi.get(
            `http://localhost:8083/api/authors/TopInGenre/${genreId}?${params}`
        );
        return response.data.content;
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

export const fetchSimilarAuthorsByGenre = createAsyncThunk<AuthorSimpleDto[],
    { authorId: string,page?: number; size?: number }
>(
    "authors/SimilarAuthorsByGenre",
    async({authorId,page = 0,size = 20}) =>{
            const params = new URLSearchParams();
            if (page !== undefined) params.append('page', page.toString());
            if (size !== undefined) params.append('size', size.toString());
            const response = await $authApi.get(
                `http://localhost:8083/api/authors/SimilarByGenres/${authorId}?${params}`
            );
            return response.data.content;
    }
)

export const fetchAuthorPlaysByMonth = createAsyncThunk<number, string>(
    "author/fetchAuthorPlaysByMonth",
    async (authorId) => {
        const response = await $authApi.get<number>(
            `http://localhost:8083/api/authors/getCountAuthorPlaysByMonth/${authorId}`
        );
        return response.data;
    }
);

