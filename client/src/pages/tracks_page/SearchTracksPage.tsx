import { Box, Stack, Typography } from "@mui/material";
import TrackList from "../../components/lists/TrackList";
import MyPagination from "../../components/MyPagination";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useTranslation } from "react-i18next";
import { setCurrentPage } from "../../store/reducers/PageSlice";
import { searchTracks } from "../../store/reducers/action-creators/search";
import { selectTracksResults } from "../../store/reducers/SearchSlice.ts";


export default function SearchTracksPage() {
    const { currentPage, totalPages } = useAppSelector(state => state.page);
    const { query } = useParams<{ query: string }>();
    const { t } = useTranslation(["search", "other"]);

    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracksResults);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [query, dispatch]);

    const size = 10

    useEffect(() => {
        if (query && currentPage >= 1) {
            dispatch(searchTracks({
                query: query,
                page: currentPage - 1,
                size: size
            }));
        }
    }, [dispatch, currentPage, query]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("search:title-tracks")}
                </Typography>
                <Stack spacing={3} mt={3}>
                    <TrackList tracks={tracks} pageSize={size} />
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