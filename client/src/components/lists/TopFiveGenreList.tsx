import {Box, Skeleton, Typography} from "@mui/material";
import TopFiveGenreItem from "../items/TopFiveGenreItem.tsx";
import { useTranslation } from 'react-i18next';
import type { GenreSimpleDto } from "../../models/DTO/GenreSimpleDto.ts";
import type { FC } from "react";

interface TopFiveGenreListProps {
    genres: GenreSimpleDto[];
    isLoading: boolean;
    error: string | null;
}

const TopFiveGenreList: FC<TopFiveGenreListProps> = ({ genres, isLoading, error }) => {

    const { t } = useTranslation('main')

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
                        <TopFiveGenreItem key={genre.id} genre={genre.name} index={index + 1}/>
                    )}  
                </Box>
            )}
        </>
    );
};

export default TopFiveGenreList;