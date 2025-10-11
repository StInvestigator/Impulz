import {Box, Button, Typography} from "@mui/material";
import TrackList from "../components/lists/TrackList.tsx";
import PodcastList from "../components/lists/PodcastList.tsx";
import AuthorList from "../components/lists/AuthorList.tsx";
import {useTranslation} from "react-i18next";
import {useAppNavigate} from "../hooks/useAppNavigate.ts";
import type {AuthorSimpleDto} from "../models/DTO/AuthorSimpleDto.ts";
import type {TrackSimpleDto} from "../models/DTO/track/TrackSimpleDto.ts";

const authors: AuthorSimpleDto[] = [
    {
        id: "1",
        name: "Автор 1",
        imgUrl: ""
    },
    {
        id: "2",
        name: "Автор 2",
        imgUrl: ""
    },
];

const tracks: TrackSimpleDto[] = [
    {
        id: 1,
        title: "Назва треку 1",
        album: "Альбом 1",
        albumId: 1,
        authors: [authors[0]],
        durationSec: 180,
        imgUrl: ""
    },
    {
        id: 2,
        title: "Назва треку 2",
        album: "Альбом 2",
        albumId: 2,
        authors: [authors[1]],
        durationSec: 210,
        imgUrl: ""
    }
];

const UserProfilePage = () => {
    const route = useAppNavigate();
    const { t } = useTranslation(["authorPage", "other"]);

    return (
        <>
            <Box component={"section"} height={"450px"} sx={{
                backgroundColor: "#D9D9D9"
            }}>
                {/*  <Profile type="user" author={authors}/> */ }
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
                    <TrackList tracks={tracks}/>
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
                {/* <AlbumList albums={albums}/> */}
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

export default UserProfilePage;