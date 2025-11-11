import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface LikedState {
    likedIds: number[];
}

const initialState: LikedState = {
    likedIds: []
};

const likedSlice = createSlice({
    name: "liked",
    initialState,
    reducers: {
        setLiked: (state, action: PayloadAction<number[]>) => {
            state.likedIds = action.payload;
        },
    },
});

export const { setLiked } = likedSlice.actions;
export default likedSlice.reducer;
