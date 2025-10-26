import {combineReducers, configureStore} from "@reduxjs/toolkit";
import AuthorReducer from "./reducers/AuthorSlice.ts"
import PlaylistReducer from "./reducers/PlaylistSlice.ts"
import PlayerReducer from "./reducers/PlayerSlice.ts"
import TrackReducer from "./reducers/TrackSlice.ts"
import GenreReducer from "./reducers/GenreSlice.ts"
import AlbumReducer from "./reducers/AlbumSlice.ts"
import PageReducer from "./reducers/PageSlice.ts";
import ProfileReducer from "./reducers/ProfileSlice.ts";
import SearchReducer from "./reducers/SearchSlice.ts";
import SubscriptionReducer from "./reducers/SubscriptionSlice.ts";


const rootReducer = combineReducers({
    author: AuthorReducer,
    playlist: PlaylistReducer,
    player: PlayerReducer,
    track: TrackReducer,
    genre: GenreReducer,
    album: AlbumReducer,
    page: PageReducer,
    profile: ProfileReducer,
    search: SearchReducer,
    subscribtion: SubscriptionReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']