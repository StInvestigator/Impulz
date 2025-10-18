import {Box, Skeleton, Typography} from "@mui/material";
import TopFiveGenreItem from "../items/TopFiveGenreItem.tsx";
import type { GenreSimpleDto } from "../../models/DTO/GenreSimpleDto.ts";
import type { FC } from "react";
import { useTranslation } from 'react-i18next';

interface TopFiveGenreListProps {
    genres: GenreSimpleDto[];
    isLoading: boolean;
    error: string | null;
}

const TopFiveGenreList: FC<TopFiveGenreListProps> = ({ genres, isLoading, error }) => {

    const { t } = useTranslation('main')
    const {i18n} = useTranslation();
    const isUkrainian = i18n.language?.toLowerCase().startsWith('uk');

    return (
        <>
            {isLoading || error ? (
                <Skeleton
                variant="rectangular"
                width="100%"
                height="960px"
                sx={{ borderRadius: "10px" }}
                />
            ) : (
                <Box p={3} bgcolor={"var(--dark-purple)"} borderRadius={"10px"}>
                    <Typography variant={"h1"} fontSize={"36px"} fontWeight={700} mb={"5px"} color="var(--deep-sky-blue)">
                        {t("title-top-listens")}
                    </Typography>
                    {genres.map((genre, index) =>
                        <TopFiveGenreItem key={genre.id} genre={isUkrainian ? genre.uaName : genre.name} index={index + 1} genreId={genre.id}/>
                    )}  
                </Box>
            )}
        </>
    );
};

export default TopFiveGenreList;