import {Box, Button, Typography} from "@mui/material";
import Profile from "../components/Profile.tsx";
import {useParams} from "react-router-dom";
import TrackList from "../components/lists/TrackList.tsx";
import AlbumList from "../components/lists/AlbumList.tsx";
import PodcastList from "../components/lists/PodcastList.tsx";
import AuthorList from "../components/lists/AuthorList.tsx";
import {useTranslation} from "react-i18next";
import {useAppNavigate} from "../hooks/useAppNavigate.ts";

const authors = [
    "Автор 1",
    "Автор 2",
    "Автор 3",
    "Автор 4",
    "Автор 5",
]

const albums = [
    "Альбом 1",
    "Альбом 2",
    "Альбом 3",
    "Альбом 4",
    "Альбом 5",
]

const AuthorProfilePage = () => {
    const {name} = useParams<{name: string}>();
    const route = useAppNavigate();
    const { t } = useTranslation(["authorPage", "other"]);

    return (
        <>
            <Box component={"section"} height={"450px"} sx={{
                backgroundColor: "#D9D9D9"
            }}>
                <Profile type="author" name={name ?? "Анонім"}/>
            </Box>

            <Box component={"section"} mt={"60px"}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
                    <Typography variant={"h2"} fontSize={"36px"}>
                        {t("authorPage:title-popular-tracks")}
                    </Typography>
                    <Button sx={{
                        height: "32px",
                        border: "1px solid black",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "black",
                        textTransform: "none"
                    }}>
                        {t("other:button-watch-all")}
                    </Button>
                </Box>
                <Box display={"grid"} sx={{
                    gridTemplateColumns: "repeat(2, 1fr)"
                }} gap={3}>
                    <TrackList/>
                </Box>
            </Box>

            <Box component={"section"} mt={"60px"}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
                    <Typography variant={"h2"} fontSize={"24px"}>
                        {t("authorPage:title-albums")}
                    </Typography>
                    <Button sx={{
                        height: "32px",
                        border: "1px solid black",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "black",
                        textTransform: "none"
                    }}>
                        {t("other:button-watch-all")}
                    </Button>
                </Box>
                <AlbumList albums={albums}/>
            </Box>

            <Box component={"section"} mt={"60px"}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
                    <Typography variant={"h2"} fontSize={"24px"}>
                        {t("authorPage:title-collaborations")}
                    </Typography>
                    <Button sx={{
                        height: "32px",
                        border: "1px solid black",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "black",
                        textTransform: "none"
                    }}>
                        {t("other:button-watch-all")}
                    </Button>
                </Box>
                <PodcastList/>
            </Box>

            <Box component={"section"} mt={"60px"}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
                    <Typography variant={"h2"} fontSize={"24px"}>
                        {t("authorPage:title-similar-author")}
                    </Typography>
                    <Button onClick={() => route("/allAuthors")} sx={{
                        height: "32px",
                        border: "1px solid black",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "black",
                        textTransform: "none"
                    }}>
                        {t("other:button-watch-all")}
                    </Button>
                </Box>
                <AuthorList authors={authors}/>
            </Box>
        </>
    );
};

export default AuthorProfilePage;