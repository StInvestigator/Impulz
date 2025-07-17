import React from 'react';
import {Box, Typography} from "@mui/material";
import TopFiveGenreItem from "../items/TopFiveGenreItem";

const top_5_genres = [
    "Інструментальна музика",
    "Рок",
    "Хіп-хоп",
    "Поп",
    "Джаз"
]

const TopFiveGenreList = () => {
    return (
        <Box p={3} bgcolor={"#D9D9D9"} borderRadius={"10px"}>
            <Typography variant={"h1"} fontSize={"36px"} fontWeight={700} mb={"5px"}>
                Найбільше слухають
            </Typography>
            {top_5_genres.map((genre, index) =>
                <TopFiveGenreItem key={genre} genre={genre} index={index + 1}/>
            )}
        </Box>
    );
};

export default TopFiveGenreList;