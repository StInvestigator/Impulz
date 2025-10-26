import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {TrackSimpleDto} from "../../models/DTO/track/TrackSimpleDto.ts";

export interface PlayerSource {
    type: "author" | "album" | "playlist";
    id: string | number;
    name?: string;
    page: number;
    size: number;
    hasMore: boolean;
    totalPages: number;
}

interface PlayerState {
    active: TrackSimpleDto | null;
    playlist: TrackSimpleDto[];
    bufferTracks: TrackSimpleDto[];
    currentTrackIndex: number;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
    source: PlayerSource | null;
    playbackMode: "replace" | "append";
    isLoading: boolean;
    isBufferLoading: boolean;
}

const initialState: PlayerState = {
    active: null,
    playlist: [],
    bufferTracks: [],
    currentTrackIndex: -1,
    currentTime: 0,
    duration: 0,
    volume: 50,
    pause: true,
    source: null,
    playbackMode: "replace",
    isLoading: false,
    isBufferLoading: false
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setActive: (state, action: PayloadAction<TrackSimpleDto>) => {
            const track = action.payload;
            const trackIndex = state.playlist.findIndex(t => t.id === track.id);

            if (trackIndex !== -1) {
                state.active = track;
                state.currentTrackIndex = trackIndex;
                state.pause = false;
                state.currentTime = 0;
            }
        },
        addToPlaylist: (state, action: PayloadAction<TrackSimpleDto[]>) => {
            if (action.payload.length === 0) return;

            const wasPlaying = !state.pause;
            const previousActive = state.active;
            const previousTime = state.currentTime;
            const previousDuration = state.duration;

            state.playlist = [...state.playlist, ...action.payload];

            if (state.active === null && state.playlist.length > 0) {
                state.currentTrackIndex = 0;
                state.active = state.playlist[0];
                state.duration = 0;
                state.currentTime = 0;
                state.pause = true;
            } else {
                state.active = previousActive;
                state.duration = previousDuration;
                state.currentTime = previousTime;
                state.pause = wasPlaying ? false : true;
            }
        },
        removeFromPlaylist: (state, action: PayloadAction<TrackSimpleDto>) => {
            const trackToRemove = action.payload;
            const trackIndex = state.playlist.findIndex(t => t.id === trackToRemove.id);

            if (trackIndex !== -1) {
                state.playlist.splice(trackIndex, 1);

                if (state.currentTrackIndex >= trackIndex) {
                    if (state.currentTrackIndex > trackIndex) {
                        state.currentTrackIndex--;
                    } else if (state.currentTrackIndex === trackIndex) {
                        if (state.playlist.length > 0) {
                            state.currentTrackIndex = Math.min(trackIndex, state.playlist.length - 1);
                            state.active = state.playlist[state.currentTrackIndex];
                        } else {
                            state.currentTrackIndex = -1;
                            state.active = null;
                        }
                    }
                }
            }
        },
        appendToPlaylist: (state, action: PayloadAction<TrackSimpleDto[]>) => {
            if (action.payload.length === 0) return;

            state.playlist.push(...action.payload);
        },

        setPlaylist: (state, action: PayloadAction<TrackSimpleDto[]>) => {
            const isSamePlaylist =
                state.playlist.length === action.payload.length &&
                state.playlist.every((track, index) => track.id === action.payload[index]?.id);

            if (isSamePlaylist) {
                return;
            }

            const currentTrackId = state.active?.id;
            const wasPlaying = !state.pause;
            const previousTime = state.currentTime;
            const previousDuration = state.duration;

            state.playlist = action.payload;
            state.bufferTracks = [];

            if (action.payload.length > 0) {
                const newIndex = action.payload.findIndex(track => track.id === currentTrackId);

                if (newIndex !== -1) {
                    state.currentTrackIndex = newIndex;
                    state.active = action.payload[newIndex];
                    state.duration = previousDuration;
                    state.currentTime = previousTime;
                    state.pause = wasPlaying ? false : true;
                } else {
                    state.currentTrackIndex = 0;
                    state.active = action.payload[0];
                    state.duration = 0;
                    state.currentTime = 0;
                    state.pause = true;
                }
            } else {
                state.currentTrackIndex = -1;
                state.active = null;
                state.duration = 0;
                state.currentTime = 0;
                state.pause = true;
            }
        },

        insertNextInPlaylist: (state, action: PayloadAction<TrackSimpleDto[]>) => {
            if (action.payload.length === 0) return;

            if (state.currentTrackIndex === -1) {
                state.playlist = action.payload;
                state.currentTrackIndex = 0;
                state.active = action.payload[0];
            } else {
                const insertIndex = state.currentTrackIndex + 1;
                state.playlist = [
                    ...state.playlist.slice(0, insertIndex),
                    ...action.payload,
                    ...state.playlist.slice(insertIndex)
                ];
            }

            state.duration = 0;
            state.currentTime = 0;
            state.pause = true;
        },

        setPlaybackMode: (state, action: PayloadAction<"replace" | "append">) => {
            state.playbackMode = action.payload;
        },

        playTrack: (state) => {
            state.pause = false;
        },

        pauseTrack: (state) => {
            state.pause = true;
        },

        nextTrack: (state) => {
            if (state.playlist.length === 0) return;

            const nextIndex = state.currentTrackIndex + 1;
            if (nextIndex < state.playlist.length) {
                state.currentTrackIndex = nextIndex;
                state.active = state.playlist[nextIndex];
            }
        },

        prevTrack: (state) => {
            if (state.playlist.length === 0) return;

            const prevIndex = state.currentTrackIndex - 1;
            if (prevIndex >= 0) {
                state.currentTrackIndex = prevIndex;
                state.active = state.playlist[prevIndex];
            }
        },

        setCurrentTrack: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0 && action.payload < state.playlist.length) {
                state.currentTrackIndex = action.payload;
                state.active = state.playlist[action.payload];
            }
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },

        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },

        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },

        clearPlaylist: (state) => {
            state.playlist = [];
            state.bufferTracks = [];
            state.currentTrackIndex = -1;
            state.active = null;
            state.duration = 0;
            state.currentTime = 0;
            state.pause = true;
            state.source = null;
        },

        setSource: (state, action: PayloadAction<PlayerSource | null>) => {
            state.source = action.payload;
        },

        updateSourcePage: (state) => {
            if (state.source) {
                state.source.page += 1;
            }
        },

        setSourceHasMore: (state, action: PayloadAction<boolean>) => {
            if (state.source) {
                state.source.hasMore = action.payload;
            }
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        setPaginationSource: (state, action: PayloadAction<{
            source: PlayerSource;
            initialTracks: TrackSimpleDto[];
            startIndex?: number;
        }>) => {
            const { source, initialTracks, startIndex = 0 } = action.payload;

            state.source = source;
            state.playlist = initialTracks;
            state.bufferTracks = [];

            if (initialTracks.length > 0) {
                const safeIndex = Math.max(0, Math.min(startIndex, initialTracks.length - 1));
                state.currentTrackIndex = safeIndex;
                state.active = initialTracks[safeIndex];
                state.pause = true;
            } else {
                state.currentTrackIndex = -1;
                state.active = null;
            }

            state.duration = 0;
            state.currentTime = 0;
        },

        addNextPage: (state, action: PayloadAction<TrackSimpleDto[]>) => {
            if (action.payload.length === 0) return;

            state.playlist.push(...action.payload);

            if (state.source && action.payload.length < state.source.size) {
                state.source.hasMore = false;
            }
        },

        setBufferTracks: (state, action: PayloadAction<TrackSimpleDto[]>) => {
            console.log('💽 Редьюсер setBufferTracks: устанавливаем', action.payload.length, 'треков');
            state.bufferTracks = action.payload;
            console.log('💽 Буфер после установки:', state.bufferTracks.length, 'треков');
        },

        appendBufferToPlaylist: (state) => {
            if (state.bufferTracks.length > 0) {
                state.playlist.push(...state.bufferTracks);
                state.bufferTracks = [];
            }
        },

        clearBuffer: (state) => {
            state.bufferTracks = [];
        },

        setBufferLoading: (state, action: PayloadAction<boolean>) => {
            state.isBufferLoading = action.payload;
        },

        setSourceWithBuffer: (state, action: PayloadAction<{
            source: PlayerSource;
            initialTracks: TrackSimpleDto[];
            bufferTracks: TrackSimpleDto[];
            startIndex?: number;
        }>) => {
            const { source, initialTracks, bufferTracks, startIndex = 0 } = action.payload;

            console.log('💽 Устанавливаем источник с буфером:', {
                sourceType: source.type,
                sourceId: source.id,
                initialTracks: initialTracks.length,
                bufferTracks: bufferTracks.length
            });

            state.source = source;
            state.playlist = initialTracks;
            state.bufferTracks = bufferTracks;

            if (initialTracks.length > 0) {
                const safeIndex = Math.max(0, Math.min(startIndex, initialTracks.length - 1));
                state.currentTrackIndex = safeIndex;
                state.active = initialTracks[safeIndex];
                state.pause = true;
            } else {
                state.currentTrackIndex = -1;
                state.active = null;
            }

            state.duration = 0;
            state.currentTime = 0;
        },

        loadNextPageToBuffer: (state, action: PayloadAction<TrackSimpleDto[]>) => {
            state.bufferTracks = action.payload;
            state.isBufferLoading = false;
        }
    }
});

export const {
    setPlaylist,
    setActive,
    addToPlaylist,
    removeFromPlaylist,
    appendToPlaylist,
    insertNextInPlaylist,
    setPlaybackMode,
    playTrack,
    pauseTrack,
    nextTrack,
    prevTrack,
    setCurrentTrack,
    setDuration,
    setCurrentTime,
    setVolume,
    clearPlaylist,
    setSource,
    updateSourcePage,
    setSourceHasMore,
    setLoading,
    setPaginationSource,
    addNextPage,
    setBufferTracks,
    appendBufferToPlaylist,
    clearBuffer,
    setBufferLoading,
    setSourceWithBuffer,
    loadNextPageToBuffer
} = playerSlice.actions;

export default playerSlice.reducer;