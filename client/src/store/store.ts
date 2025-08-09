import {combineReducers, configureStore} from "@reduxjs/toolkit";
import AuthorReducer from "./reducers/AuthorSlice.ts"
import PlaylistReducer from "./reducers/PlaylistSlice.ts"


const rootReducer = combineReducers({
    AuthorReducer,
    PlaylistReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']