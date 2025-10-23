import { Box, Stack, Typography } from "@mui/material";
import TrackList from "../../components/lists/TrackList";
import MyPagination from "../../components/MyPagination";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPopularTracksByAuthor } from "../../store/reducers/action-creators/tracks";
import {useTranslation} from "react-i18next";
import { setCurrentPage } from "../../store/reducers/PageSlice";

export default function FavoriteTracksPage() {
    const {currentPage, totalPages} = useAppSelector(state => state.page);
    const {id} = useParams<{ id:string }>();
    const { t } = useTranslation(["authorPage", "other"]);

    const dispatch = useAppDispatch();
    const { popularTracks } = useAppSelector(state => state.track);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [id, dispatch]);

    const size = 10

    useEffect(() => {
        if (id && currentPage >= 1) {
            dispatch(fetchPopularTracksByAuthor({
                authorId: id,
                page: currentPage - 1,
                size: size
            }));
        }
    }, [dispatch, currentPage, id]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("authorPage:title-popular-tracks")}
                </Typography>
                <Stack spacing={3} mt={3}>
                    <TrackList tracks={popularTracks} pageSize={size}/>
                </Stack>
            </Box>
            {shouldShowPagination && (
                <Box component={"section"} marginTop={"60px"}>
                    <MyPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                    />
                </Box>
            )}
        </>
    );
}