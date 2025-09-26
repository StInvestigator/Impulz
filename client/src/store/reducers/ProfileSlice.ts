import { createSlice } from "@reduxjs/toolkit";
import type { UserDto } from "../../models/UserDto";

interface ProfileState {
    profile: UserDto;
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
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, action) {
            state.profile = action.payload;
        },
    },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
