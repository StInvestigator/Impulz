import { Box, Stack, Typography } from "@mui/material";
import TrackList from "../../components/lists/TrackList";
import MyPagination from "../../components/MyPagination";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { setCurrentPage } from "../../store/reducers/PageSlice";
import { fetchTopTracksByWeek } from "../../store/reducers/action-creators/tracks";

const HitsWeekPage = () => {
  const { currentPage, totalPages } = useAppSelector((state) => state.page);
  const { t } = useTranslation(["main"]);

  const dispatch = useAppDispatch();
  const { topTracks } = useAppSelector((state) => state.track);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  const size = 10

  useEffect(() => {
    if (currentPage >= 1) {
      dispatch(
        fetchTopTracksByWeek({
          page: currentPage - 1,
          size: size,
        })
      );
    }
  }, [dispatch, currentPage]);

  const shouldShowPagination = totalPages > 1;

  return (
    <>
      <Box component={"section"}>
        <Typography variant="h2">
          {t("title-hits-week")}
        </Typography>
        <Stack spacing={3} mt={3}>
          <TrackList tracks={topTracks} pageSize={size}/>
        </Stack>
      </Box>
      {shouldShowPagination && (
        <Box component={"section"} marginTop={"60px"}>
          <MyPagination totalPages={totalPages} currentPage={currentPage} />
        </Box>
      )}
    </>
  );
};

export default HitsWeekPage;
