import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { setCurrentPage } from '../../store/reducers/PageSlice';
import { fetchTopPlaylistsByWeek } from '../../store/reducers/action-creators/playlist';
import { Box, Typography } from '@mui/material';
import MyPagination from '../../components/MyPagination';
import PublicPlaylistList from '../../components/lists/PublicPlaylistList';

function BestPlaylistByWeekPage() {
  const { currentPage, totalPages } = useAppSelector((state) => state.page);
  const { t } = useTranslation(["main"]);

  const dispatch = useAppDispatch();
  const { topPlaylists } = useAppSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  useEffect(() => {
    if (currentPage >= 1) {
      dispatch(
        fetchTopPlaylistsByWeek({
          page: currentPage - 1,
          size: 5,
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
        <Box display={"grid"} mt={3} sx={{
            gridTemplateColumns: "repeat(5, 1fr)"
        }} gap={3}>
          <PublicPlaylistList playlists={topPlaylists} />
        </Box>
      </Box>
      {shouldShowPagination && (
        <Box component={"section"} marginTop={"60px"}>
          <MyPagination totalPages={totalPages} currentPage={currentPage} />
        </Box>
      )}
    </>
  );
}

export default BestPlaylistByWeekPage