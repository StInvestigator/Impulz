import {createSlice} from "@reduxjs/toolkit";
import type { AuthorSimpleDto } from "../../models/DTO/AuthorSimpleDto";
import { fetchTop20AuthorsByWeek } from "./action-creators/author";

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
            .addCase(fetchTop20AuthorsByWeek.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTop20AuthorsByWeek.fulfilled, (state, action) => {
                state.isLoading = false;
                state.topAuthors = action.payload;
            })
            .addCase(fetchTop20AuthorsByWeek.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Unknown error";
            });
    }
})

export default AuthorSlice.reducer