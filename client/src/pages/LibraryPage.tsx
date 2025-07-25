import LibraryGrid from "../components/library_grid/LibraryGrid";
import { ThemeProvider, createTheme } from '@mui/material/styles';

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