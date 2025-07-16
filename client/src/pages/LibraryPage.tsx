import React from 'react';
import UpperLibraryGridPart from "../components/library_grid/UpperLibraryGridPart";
import LowerLibraryGridPart from "../components/library_grid/LowerLibraryGridPart";
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
             <CssBaseline />
            <UpperLibraryGridPart />
            <LowerLibraryGridPart />
        </ThemeProvider>
    );
};

export default LibraryPage;