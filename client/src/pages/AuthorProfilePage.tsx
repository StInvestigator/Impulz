import {Box, Button, Typography} from "@mui/material";
import Profile from "../components/Profile.tsx";
import {useParams} from "react-router-dom";
import TrackList from "../components/lists/TrackList.tsx";
import AlbumList from "../components/lists/AlbumList.tsx";
import PodcastList from "../components/lists/PodcastList.tsx";
import AuthorList from "../components/lists/AuthorList.tsx";
import {useTranslation} from "react-i18next";
import {useAppNavigate} from "../hooks/useAppNavigate.ts";
import UserList from "../components/lists/UserList.tsx";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {useEffect} from "react";
import {fetchAuthorCollaborations, fetchPopularTracksByAuthor} from "../store/reducers/action-creators/tracks.ts";
import type {UserSimpleDto} from "../models/DTO/UserSimpleDto.ts";
import {fetchAuthorDetails, fetchSimilarAuthorsByGenre} from "../store/reducers/action-creators/author.ts";
import {fetchAlbumsByAuthor} from "../store/reducers/action-creators/album.ts";

const users: UserSimpleDto[] = [
    {
        id: "1",
        name: "Анна Петрова",
        imgUrl: "https://via.placeholder.com/60x60?text=AP"
    },
    {
        id: "2",
        name: "Иван Сидоров",
        imgUrl: "https://via.placeholder.com/60x60?text=IS"
    },
    {
        id: "3",
        name: "Мария Иванова",
        imgUrl: "https://via.placeholder.com/60x60?text=MI"
    }
]

const AuthorProfilePage = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id:string }>();
    const route = useAppNavigate();
    const { t } = useTranslation(["authorPage", "other"]);

    const { popularTracks} = useAppSelector(state => state.track);
    const { currentAuthor } = useAppSelector(state => state.author);
    const { albums } = useAppSelector(state => state.album);
    const { similarAuthors } = useAppSelector(state => state.author);
    // const { collaborationTracks } = useAppSelector(state => state.track);

    useEffect(() => {
        if (id) {
            dispatch(fetchAuthorDetails(id));
            dispatch(fetchAlbumsByAuthor({ authorId: id, page: 0, size: 20 }));
            dispatch(fetchPopularTracksByAuthor({ authorId: id, page: 0, size: 20 }));
            dispatch(fetchAuthorCollaborations({ authorId: id, page: 0, size: 20 }));
            dispatch(fetchSimilarAuthorsByGenre({ authorId: id, page: 0, size: 20 }));
        }
    }, [dispatch, id]);

    return (
        <>
            <Box component="section" height="450px" sx={{ backgroundColor: "#D9D9D9" }}>
                {currentAuthor && <Profile type="author" author={currentAuthor} />}
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
                    <TrackList tracks={popularTracks}/>
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
                <AuthorList authors={similarAuthors}/>
            </Box>

            <Box component={"section"} mt={"60px"}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
                    <Typography variant={"h2"} fontSize={"24px"}>
                        {t("authorPage:title-subscribers")}
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
                <UserList users={users}/>
            </Box>
        </>
    );
};

export default AuthorProfilePage;