import { createSlice } from "@reduxjs/toolkit";
import {fetchAlbumDetails, fetchAlbumsByAuthor, fetchAuthorAlbumCollaborations} from "./action-creators/album.ts";
import type { AlbumSimpleDto } from "../../models/DTO/AlbumSimpleDto.ts";
import type {AlbumDto} from "../../models/AlbumDto.ts";

interface AlbumState {
    albums: AlbumSimpleDto[];
    currentAlbum: AlbumDto | null;
    authorCollaborationsAlbums: AlbumSimpleDto[];
    isLoading: boolean;
    error: string | null;
}

const initialState: AlbumState = {
    albums: [],
    currentAlbum: null,
    authorCollaborationsAlbums: [],
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
            })

            .addCase(fetchAlbumDetails.pending,(state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAlbumDetails.fulfilled,(state,action) =>{
                state.isLoading = false;
                state.currentAlbum = action.payload;
                state.error = null;
            })
            .addCase(fetchAlbumDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Ошибка при загрузке информации об альбоме";
            })

            .addCase(fetchAuthorAlbumCollaborations.pending,(state) =>{
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAuthorAlbumCollaborations.fulfilled,(state,action) =>{
                state.isLoading = false;
                state.authorCollaborationsAlbums = action.payload;
                state.error = null;
            })
            .addCase(fetchAuthorAlbumCollaborations.rejected,(state,action) =>{
                state.isLoading = false;
                state.error = action.payload || "Ошибка при загрузке альбомов-коллабораций автора";
            });
    },
});

export const { clearAlbums } = albumSlice.actions;
export default albumSlice.reducer;