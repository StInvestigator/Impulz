import {createSlice} from "@reduxjs/toolkit";
import {searchAlbums, searchAuthors, searchPublicPlaylists, searchTracks } from "./action-creators/search.ts";
import type { TrackSimpleDto } from "../../models/DTO/track/TrackSimpleDto.ts";
import type { AuthorSimpleDto } from "../../models/DTO/AuthorSimpleDto.ts";
import type { AlbumSimpleDto } from "../../models/DTO/album/AlbumSimpleDto.ts";
import type {PlaylistDto} from "../../models/PlaylistDto.ts";

interface SearchState {
    tracks: TrackSimpleDto[];
    authors: AuthorSimpleDto[];
    albums: AlbumSimpleDto[];
    playlists: PlaylistDto[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
}

const initialState: SearchState = {
    tracks: [],
    authors: [],
    albums: [],
    playlists: [],
    loading: false,
    error: null,
    searchQuery: ''
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearchResults: (state) => {
            state.tracks = [];
            state.authors = [];
            state.albums = [];
            state.playlists = [];
            state.searchQuery = '';
            state.error = null;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // searchTracks
            .addCase(searchTracks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchTracks.fulfilled, (state, action) => {
                state.loading = false;
                state.tracks = action.payload;
            })
            .addCase(searchTracks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка поиска треков';
            })
            // searchAuthors
            .addCase(searchAuthors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchAuthors.fulfilled, (state, action) => {
                state.loading = false;
                state.authors = action.payload;
            })
            .addCase(searchAuthors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка поиска авторов';
            })
            // searchAlbums
            .addCase(searchAlbums.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchAlbums.fulfilled, (state, action) => {
                state.loading = false;
                state.albums = action.payload;
            })
            .addCase(searchAlbums.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка поиска альбомов';
            })
            // searchPublicPlaylists
            .addCase(searchPublicPlaylists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchPublicPlaylists.fulfilled, (state, action) => {
                state.loading = false;
                state.playlists = action.payload;
            })
            .addCase(searchPublicPlaylists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка поиска плейлистов';
            });
    }
});

export const { clearSearchResults, setSearchQuery, clearError } = searchSlice.actions;
export default searchSlice.reducer;

export const selectTracksResults = (state: { search: SearchState }) => state.search.tracks;
export const selectAuthorsResults = (state: { search: SearchState }) => state.search.authors;
export const selectAlbumsResults = (state: { search: SearchState }) => state.search.albums;
export const selectPlaylistsResults = (state: { search: SearchState }) => state.search.playlists;
export const selectSearchLoading = (state: { search: SearchState }) => state.search.loading;
export const selectSearchError = (state: { search: SearchState }) => state.search.error;
export const selectSearchQuery = (state: { search: SearchState }) => state.search.searchQuery;