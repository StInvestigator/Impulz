import {createSlice} from "@reduxjs/toolkit";
import type { AuthorSimpleDto } from "../../models/DTO/AuthorSimpleDto";
import { fetchTop20AuthorsByMonth } from "./action-creators/author";

interface AuthorState {
    topAuthors: AuthorSimpleDto[];
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthorState = {
    topAuthors: [],
    isLoading: false,
    error: null
}

export const AuthorSlice = createSlice({
    name: "author",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTop20AuthorsByMonth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTop20AuthorsByMonth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.topAuthors = action.payload;
            })
            .addCase(fetchTop20AuthorsByMonth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Unknown error";
            });
    }
})

export default AuthorSlice.reducer