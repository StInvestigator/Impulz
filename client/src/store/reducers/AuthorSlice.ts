import {createSlice} from "@reduxjs/toolkit";

const authors = [
    'Автор 1', 'Автор 2', 'Автор 3',
    'Автор 4', 'Автор 5', 'Автор 6',
    'Автор 7', 'Автор 8','Автор 9', 'Автор 10', 'Автор 11',
    'Автор 12', 'Автор 13', 'Автор 14',
    'Автор 15', 'Автор 16'
];

interface AuthorState {
    isLoading: boolean;
    authors: string[];
    error: string;
}

const initialState: AuthorState = {
    isLoading: false,
    authors: authors,
    error: ""
}

export const AuthorSlice = createSlice({
    name: "author",
    initialState,
    reducers: {

    }
})

export default AuthorSlice.reducer