import { createSlice } from "@reduxjs/toolkit";
import type { UserDto } from "../../models/UserDto";
import {fetchUserDetails, updateUserProfile} from "./action-creators/user.ts";

interface ProfileState {
    profile: UserDto;
    isLoading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    profile: {
        id: "0",
        username: "Unknown",
        email: "Unknown",
        subscriptionsCount: 0,
        favoriteAlbums: [],
        favoritePlaylists: [],
    },
    isLoading: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, action) {
            state.profile = action.payload;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при загрузке профиля";
            })

            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Ошибка при обновлении профиля";
            });
    },
});

export const { setProfile, setLoading, setError, clearError } = profileSlice.actions;

export default profileSlice.reducer;