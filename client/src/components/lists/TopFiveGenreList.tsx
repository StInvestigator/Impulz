import {Box, Typography} from "@mui/material";
import TopFiveGenreItem from "../items/TopFiveGenreItem.tsx";
import { useTranslation } from 'react-i18next';

const top_5_genres = [
    "Інструментальна музика",
    "Рок",
    "Хіп-хоп",
    "Поп",
    "Джаз"
]

const TopFiveGenreList = () => {

    const { t } = useTranslation('main')

    return (
        <Box p={3} bgcolor={"#D9D9D9"} borderRadius={"10px"}>
            <Typography variant={"h1"} fontSize={"36px"} fontWeight={700} mb={"5px"}>
                {t("title-top-listens")}
            </Typography>
            {top_5_genres.map((genre, index) =>
                <TopFiveGenreItem key={genre} genre={genre} index={index + 1}/>
            )}
        </Box>
    );
};

export default TopFiveGenreList;