import { createSlice } from "@reduxjs/toolkit";
import { fetchAlbumsByAuthor } from "./action-creators/album.ts";
import type { AlbumSimpleDto } from "../../models/DTO/AlbumSimpleDto.ts";

interface AlbumState {
    albums: AlbumSimpleDto[];
    isLoading: boolean;
    error: string | null;
}

const initialState: AlbumState = {
    albums: [],
    isLoading: false,
    error: null,
};

const albumSlice = createSlice({
    name: "album",
    initialState,
    reducers: {
        clearAlbums: (state) => {
            state.albums = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbumsByAuthor.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAlbumsByAuthor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.albums = action.payload;
                state.error = null;
            })
            .addCase(fetchAlbumsByAuthor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Ошибка при загрузке альбомов";
            });
    },
});

export const { clearAlbums } = albumSlice.actions;
export default albumSlice.reducer;