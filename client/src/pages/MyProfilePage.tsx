import Box from "@mui/material/Box";
import MyProfile from "../components/profiles/MyProfile"
import { useAppSelector } from "../hooks/redux";
import { Button, Typography } from "@mui/material";
import AlbumList from "../components/lists/AlbumList";
import { useTranslation } from "react-i18next";
import { useAppNavigate } from "../hooks/useAppNavigate";

function MyProfilePage() {
  const {profile} = useAppSelector(state => state.profile);

  const { t } = useTranslation(["authorPage", "other"]);
  const route = useAppNavigate();
  
  return (
    <>
      <MyProfile />
      <Box component={"section"} mt={"60px"}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
            <Typography variant={"h2"} fontSize={"24px"} color="var(--indigo-dye)">
                {t("authorPage:title-albums")}
            </Typography>
            <Button onClick={() => route(`/author/${profile.id}/albums`)} sx={{
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
            <AlbumList albums={profile.favoriteAlbums} />
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
            <Typography variant={"h2"} fontSize={"24px"} color="var(--indigo-dye)">
                {t("authorPage:title-albums")}
            </Typography>
            <Button onClick={() => route(`/author/${profile.id}/albums`)} sx={{
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
            <AlbumList albums={profile.favoriteAlbums} />
        </Box>
      </Box>
    </>
  )
}

export default MyProfilePage