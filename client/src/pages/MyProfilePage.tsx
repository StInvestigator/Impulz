import Box from "@mui/material/Box";
import MyProfile from "../components/profiles/MyProfile"
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppNavigate } from "../hooks/useAppNavigate";
import { useEffect } from "react";
import { fetchLikedTracksByUserId } from "../store/reducers/action-creators/tracks";
import TrackList from "../components/lists/TrackList";

function MyProfilePage() {
  const {profile} = useAppSelector(state => state.profile);

  const { t } = useTranslation(["authorPage", "other"]);
  const route = useAppNavigate();

  const {likedTracks} = useAppSelector(state => state.track)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchLikedTracksByUserId({userId: profile.id}))
  }, [dispatch])
  
  return (
    <>
      <MyProfile />
      {likedTracks && <Box component={"section"} mt={"60px"}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
            <Typography variant={"h2"} fontSize={"24px"} color="var(--indigo-dye)">
                {t("authorPage:title-liked-tracks")}
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
    </>
  )
}

export default MyProfilePage