import './App.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Box } from "@mui/material";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer";
import { ThemeProvider } from '@mui/material/styles';
import ScrollToTop from "./components/ScrollToTop.tsx";
import {theme} from "./theme.ts";

function App() {


    return (
        <>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Navbar />
                    <Box component="main" display={"flex"}>
                        <Sidebar />
                        <Box component="article" sx={{
                            width: "100%",
                            marginLeft: `320px`,
                            marginTop: "48px",
                            padding: "60px 20px 120px 20px",
                            overflowX: 'hidden', // предотвращает скролл
                        }}>
                            <ScrollToTop />
                            <AppRouter />
                        </Box>
                    </Box>
                    <Footer/>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
