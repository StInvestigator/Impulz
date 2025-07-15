import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {Box, Toolbar} from "@mui/material";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Box component="main" display={"flex"}>
            <Sidebar/>
            <Box component="article" sx={{
                width: "100%",
                marginLeft: `320px`,
                marginTop: "48px",
                padding: "48px 20px",
                overflowX: 'hidden', // предотвращает скролл
            }}>
                <AppRouter/>
            </Box>
        </Box>
    </BrowserRouter>
  );
}

export default App;
