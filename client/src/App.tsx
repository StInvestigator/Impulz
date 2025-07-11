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
        <Box display={"flex"}>
            <Sidebar/>
            <Box component="main" sx={{
                marginLeft: `320px`,
                padding: "88px 24px 24px 24px",
            }}>
                <AppRouter/>
            </Box>
        </Box>
    </BrowserRouter>
  );
}

export default App;
