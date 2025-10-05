import type {GlobalSearchResult} from "../../models/document/GlobalSearchResult.ts";
import type {TrackDocument} from "../../models/document/TrackDocument.ts";
import type {AuthorDocument} from "../../models/document/AuthorDocument.ts";
import type {AlbumDocument} from "../../models/document/AlbumDocument.ts";
import type {PlaylistDocument} from "../../models/document/PlaylistDocument.ts";
import {createSlice} from "@reduxjs/toolkit";
import {searchAlbums, searchAll, searchAuthors, searchPublicPlaylists, searchTracks } from "./action-creators/search.ts";

interface SearchState {
    globalResults: GlobalSearchResult;
    tracks: TrackDocument[];
    authors: AuthorDocument[];
    albums: AlbumDocument[];
    playlists: PlaylistDocument[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
}

const initialState: SearchState = {
    globalResults: {
        tracks: [],
        authors: [],
        albums: [],
        playlists: []
    },
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
            state.globalResults = {
                tracks: [],
                authors: [],
                albums: [],
                playlists: []
            };
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
            // searchAll
            .addCase(searchAll.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchAll.fulfilled, (state, action) => {
                state.loading = false;
                state.globalResults = action.payload;
            })
            .addCase(searchAll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка поиска';
            })
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

export const selectGlobalSearchResults = (state: { search: SearchState }) => state.search.globalResults;
export const selectTracksResults = (state: { search: SearchState }) => state.search.tracks;
export const selectAuthorsResults = (state: { search: SearchState }) => state.search.authors;
export const selectAlbumsResults = (state: { search: SearchState }) => state.search.albums;
export const selectPlaylistsResults = (state: { search: SearchState }) => state.search.playlists;
export const selectSearchLoading = (state: { search: SearchState }) => state.search.loading;
export const selectSearchError = (state: { search: SearchState }) => state.search.error;
export const selectSearchQuery = (state: { search: SearchState }) => state.search.searchQuery;

export const selectHasSearchResults = (state: { search: SearchState }) => {
    const { tracks, authors, albums, playlists } = state.search.globalResults;
    return tracks.length > 0 || authors.length > 0 || albums.length > 0 || playlists.length > 0;
};

export const selectTotalResultsCount = (state: { search: SearchState }) => {
    const { tracks, authors, albums, playlists } = state.search.globalResults;
    return tracks.length + authors.length + albums.length + playlists.length;
};