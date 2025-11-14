import {combineReducers, configureStore} from "@reduxjs/toolkit";
import AuthorReducer from "./reducers/AuthorSlice.ts"
import PlaylistReducer from "./reducers/PlaylistSlice.ts"
import PlayerReducer from "./reducers/PlayerSlice.ts"
import TrackReducer from "./reducers/TrackSlice.ts"
import GenreReducer from "./reducers/GenreSlice.ts"
import AlbumReducer from "./reducers/AlbumSlice.ts"
import PageReducer from "./reducers/PageSlice.ts";
import LikedReducer from "./reducers/LikedSlice.ts";
import ProfileReducer from "./reducers/ProfileSlice.ts";
import SearchReducer from "./reducers/SearchSlice.ts";
import SubscriptionReducer from "./reducers/SubscriptionSlice.ts";
import UserReducer from "./reducers/UserSlice.ts";
import AlertReducer from "./reducers/AlertSlice.ts";


const rootReducer = combineReducers({
    author: AuthorReducer,
    playlist: PlaylistReducer,
    player: PlayerReducer,
    track: TrackReducer,
    genre: GenreReducer,
    album: AlbumReducer,
    page: PageReducer,
    liked: LikedReducer,
    profile: ProfileReducer,
    search: SearchReducer,
    subscribtion: SubscriptionReducer,
    user: UserReducer,
    alert: AlertReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']