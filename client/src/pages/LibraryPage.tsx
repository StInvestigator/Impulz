import React from 'react';
import LibraryGrid from "../components/library_grid/LibraryGrid";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    typography: {
        fontFamily: 'Manrope',
    },
});

const LibraryPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <LibraryGrid />
        </ThemeProvider>
    );
};

export default LibraryPage;