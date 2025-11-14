import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface LikedState {
    likedIds: { [key: number]: boolean }
}

const initialState: LikedState = {
    likedIds: {}
};

const likedSlice = createSlice({
    name: "liked",
    initialState,
    reducers: {
        setLiked: (state, action: PayloadAction<number[]>) => {
            action.payload.forEach(l =>
                state.likedIds[l] = true);
        },
        addToLiked: (state, action: PayloadAction<number>) => {
            state.likedIds[action.payload] = true;
        },
        removeFromLiked: (state, action: PayloadAction<number>) => {
            state.likedIds[action.payload] = false;
        },
    },
});

export const { setLiked, addToLiked, removeFromLiked } = likedSlice.actions;
export default likedSlice.reducer;
