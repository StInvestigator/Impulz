import Box from "@mui/material/Box";
import MyProfile from "../components/profiles/MyProfile"
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppNavigate } from "../hooks/useAppNavigate";
import { useEffect } from "react";
import { fetchLikedTracksByUserId } from "../store/reducers/action-creators/tracks";
import TrackList from "../components/lists/TrackList";
import AlbumList from "../components/lists/AlbumList.tsx";
import { fetchFavoriteAlbums } from "../store/reducers/action-creators/album.ts";
import PublicPlaylistList from "../components/lists/PublicPlaylistList.tsx";
import { fetchAllPlaylistsDtoOwnByUserId } from "../store/reducers/action-creators/playlist.ts";
import { setCurrentPage } from "../store/reducers/PageSlice.ts";

function MyProfilePage() {
  const { profile } = useAppSelector(state => state.profile);

  const { t } = useTranslation(["profile", "other"]);
  const route = useAppNavigate();

  const { likedTracks } = useAppSelector(state => state.track);
  const { favoriteAlbums } = useAppSelector(state => state.album);
  const { allPlaylistsDtoOwnByUser } = useAppSelector(state => state.playlist);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCurrentPage(1))
    dispatch(fetchLikedTracksByUserId({ userId: profile.id, size: 10 }))
  }, [dispatch, profile.id])

  useEffect(() => {
    if (profile.id) {
      dispatch(fetchFavoriteAlbums({ userId: profile.id, size: 5 }));
    }
  }, [dispatch, profile.id]);

  useEffect(() => {
    if (profile.id) {
      dispatch(fetchAllPlaylistsDtoOwnByUserId({ userId: profile.id, size: 5 }));
    }
  }, [dispatch, profile.id]);

  return (
    <>
      <MyProfile />
      {likedTracks && <Box component={"section"} mt={"60px"}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
          <Typography variant={"h2"} fontSize={"24px"} color="var(--indigo-dye)">
            {t("profile:title-liked-tracks")}
          </Typography>
          <Button onClick={() => route(`/playlist/liked`)} sx={{
            height: "32px",
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "var(--dark-purple)",
            color: "var(--columbia-blue)",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "none"
          }}>
            {t("other:button-watch-all")}
          </Button>
        </Box>
        <Box display={"grid"} sx={{
          gridTemplateColumns: "repeat(2, 1fr)"
        }} gap={3}>
          <TrackList tracks={likedTracks} />
        </Box>
      </Box>
      }

      <Box component={"section"} mt={"60px"}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
          <Typography variant={"h2"} fontSize={"24px"} color="var(--indigo-dye)">
            {t("profile:title-liked-albums")}
          </Typography>
          <Button onClick={() => route(`/user/${profile.id}/favorite-albums`)}
            sx={{
              height: "32px",
              border: "1px solid black",
              borderRadius: "10px",
              backgroundColor: "var(--dark-purple)",
              color: "var(--columbia-blue)",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "none"
            }}>
            {t("other:button-watch-all")}
          </Button>
        </Box>
        <AlbumList albums={favoriteAlbums} />
      </Box>

      <Box component={"section"} mt={"60px"}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
          <Typography variant={"h2"} fontSize={"24px"} color="var(--indigo-dye)">
            {t("profile:title-playlists")}
          </Typography>
          <Button
            onClick={() => route(`/playlist/user-playlists`)}
            sx={{
              height: "32px",
              border: "1px solid black",
              borderRadius: "10px",
              backgroundColor: "var(--dark-purple)",
              color: "var(--columbia-blue)",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "none"
            }}
          >
            {t("other:button-watch-all")}
          </Button>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(260px, 1fr))"
          gap={3}
        >
          <PublicPlaylistList playlists={allPlaylistsDtoOwnByUser} />
        </Box>
      </Box>

    </>
  )
}

export default MyProfilePage