import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface LikedState {
    likedIds: number[];
    changed: boolean
}

const initialState: LikedState = {
    likedIds: [],
    changed: false
};

const likedSlice = createSlice({
    name: "liked",
    initialState,
    reducers: {
        setLiked: (state, action: PayloadAction<number[]>) => {
            state.likedIds = action.payload;
        },
        addToLiked: (state, action: PayloadAction<number>) => {
            state.likedIds.push(action.payload);
        },
        removeFromLiked: (state, action: PayloadAction<number>) => {
            const index: number = state.likedIds.indexOf(action.payload)
            if (index > -1) {
                state.likedIds.splice(index, 1);
            }
        },
        updateChanged: (state) => {
            state.changed = !state.changed;
        },
    },
});

export const { setLiked, addToLiked, removeFromLiked, updateChanged } = likedSlice.actions;
export default likedSlice.reducer;
