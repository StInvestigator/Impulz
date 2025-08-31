import {combineReducers, configureStore} from "@reduxjs/toolkit";
import AuthorReducer from "./reducers/AuthorSlice.ts"
import PlaylistReducer from "./reducers/PlaylistSlice.ts"
import PlayerReducer from "./reducers/PlayerSlice.ts"
import TrackReducer from "./reducers/TrackSlice.ts"


const rootReducer = combineReducers({
    author: AuthorReducer,
    playlist: PlaylistReducer,
    player: PlayerReducer,
    track: TrackReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']