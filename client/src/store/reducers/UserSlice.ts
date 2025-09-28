import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {UserDto} from "../../models/UserDto.ts";
import {fetchUserDetails} from "./action-creators/user.ts";

interface UserState {
    userDetail: UserDto | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userDetail: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.userDetail = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<UserDto>) => {
                state.loading = false;
                state.userDetail = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось получить данные о пользователе';
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;