import {Box, Button, Typography} from "@mui/material";
import AuthorProfile from "../components/profiles/AuthorProfile.tsx";
import {useParams} from "react-router-dom";
import TrackList from "../components/lists/TrackList.tsx";
import AlbumList from "../components/lists/AlbumList.tsx";
import AuthorList from "../components/lists/AuthorList.tsx";
import {useTranslation} from "react-i18next";
import {useAppNavigate} from "../hooks/useAppNavigate.ts";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {useEffect} from "react";
import {fetchPopularTracksByAuthor} from "../store/reducers/action-creators/tracks.ts";
import {
    checkSubscriptionStatus,
    fetchAuthorDetails,
    fetchSimilarAuthorsByGenre, subscribeToAuthor, unsubscribeFromAuthor
} from "../store/reducers/action-creators/author.ts";
import {fetchAlbumsByAuthor, fetchAuthorAlbumCollaborations} from "../store/reducers/action-creators/album.ts";

const AuthorProfilePage = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id:string }>();
    const route = useAppNavigate();
    const { t } = useTranslation(["authorPage", "other"]);

    const { popularTracks} = useAppSelector(state => state.track);
    const { currentAuthor } = useAppSelector(state => state.author);
    const { albums } = useAppSelector(state => state.album);
    const { similarAuthors } = useAppSelector(state => state.author);
    const { authorCollaborationsAlbums } = useAppSelector(state => state.album);
    const { subscriptionStatus, subscriptionLoading } = useAppSelector(state => state.author);

    const isSubscribed = id ? subscriptionStatus[id] : false;

    useEffect(() => {
        if (id) {
            dispatch(fetchAuthorDetails(id));
            dispatch(fetchAlbumsByAuthor({ authorId: id, page: 0, size: 20 }));
            dispatch(fetchPopularTracksByAuthor({ authorId: id, page: 0, size: 20 }));
            dispatch(fetchSimilarAuthorsByGenre({ authorId: id, page: 0, size: 20 }));
            dispatch(fetchAuthorAlbumCollaborations({authorId: id, page: 0, size: 20 }));

            dispatch(checkSubscriptionStatus(id));
        }
    }, [dispatch, id]);

    const handleSubscription = async () => {
        if (!id) return;

        try {
            if (isSubscribed) {
                await dispatch(unsubscribeFromAuthor(id)).unwrap();
            } else {
                await dispatch(subscribeToAuthor(id)).unwrap();
            }
        } catch (error) {
            console.error("Ошибка подписки:", error);
        }
    };

    return (
        <>
            <Box component="section" height="450px" >
                {currentAuthor && (
                    <AuthorProfile
                        author={currentAuthor}
                        onSubscriptionChange={handleSubscription}
                        isSubscribed={isSubscribed}
                        subscriptionLoading={subscriptionLoading}
                    />
                )}
            </Box>

            <Box component={"section"} mt={"60px"}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
                    <Typography variant={"h2"} fontSize={"36px"} color="var(--indigo-dye)">
                        {t("authorPage:title-popular-tracks")}
                    </Typography>
                    <Button onClick={() => route(`/author/${id}/popularTracks`)} sx={{
                        height: "32px",
                        border: "1px solid black",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: 600,
                        backgroundColor: "var(--dark-purple)",
                        color: "var(--columbia-blue)",
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
                    <Typography variant={"h2"} fontSize={"24px"} color="var(--indigo-dye)">
                        {t("authorPage:title-albums")}
                    </Typography>
                    <Button onClick={() => route(`/author/${id}/albums`)} sx={{
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
                <AlbumList albums={albums}/>
            </Box>

            {authorCollaborationsAlbums && authorCollaborationsAlbums.length > 0 && (
                <Box component={"section"} mt={"60px"}>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
                        <Typography variant={"h2"} fontSize={"24px"} color="var(--indigo-dye)">
                            {t("authorPage:title-collaborations")}
                        </Typography>
                        <Button onClick={() => route(`/author/${id}/collaborations`)} sx={{
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
                    <AlbumList albums={authorCollaborationsAlbums}/>
                </Box>
            )}

            {similarAuthors.length > 1 &&(
                <Box component={"section"} mt={"60px"}>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
                        <Typography variant={"h2"} fontSize={"24px"} color="var(--indigo-dye)">
                            {t("authorPage:title-similar-author")}
                        </Typography>
                        <Button onClick={() => route(`/author/${id}/similarAuthors`)} sx={{
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
                    <AuthorList authors={similarAuthors}/>
                </Box>
            )}


        </>
    );
};

export default AuthorProfilePage;