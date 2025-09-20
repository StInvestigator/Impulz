import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface PageState {
    currentPage: number;
    totalPages: number;
}

const initialState: PageState = {
    currentPage: 1,
    totalPages: 1,
};

const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
    },
});

export const { setCurrentPage, setTotalPages } = pageSlice.actions;
export default pageSlice.reducer;
