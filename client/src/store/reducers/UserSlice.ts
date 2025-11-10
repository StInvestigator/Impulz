import { createSlice } from "@reduxjs/toolkit";
import {
    fetchUserDetails,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword
} from "./action-creators/user.ts";

import type {UserDto} from "../../models/UserDto.ts";

interface UserState {
    user: UserDto | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    success: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserState(state) {
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch user details";
            });

        builder
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update profile";
            });

        builder
            .addCase(updateUserEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateUserEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
            })
            .addCase(updateUserEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update email";
            });

        builder
            .addCase(updateUserPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateUserPassword.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateUserPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update password";
            });
    },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
