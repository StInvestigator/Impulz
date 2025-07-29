import {Box} from "@mui/material";
import ProfileAuthor from "../components/ProfileAuthor.tsx";
import {useParams} from "react-router-dom";
import TrackList from "../components/lists/TrackList.tsx";
import AlbumList from "../components/lists/AlbumList.tsx";
import PodcastList from "../components/lists/PodcastList.tsx";
import AuthorList from "../components/lists/AuthorList.tsx";

const AuthorPage = () => {
    const {name} = useParams<{name: string}>();

    return (
        <>
            <Box component={"section"} height={"450px"} sx={{
                backgroundColor: "#D9D9D9"
            }}>
                <ProfileAuthor name={name ?? "Анонім"}/>
            </Box>

            <Box component={"section"} mt={"60px"}>
                <TrackList/>
            </Box>

            <Box component={"section"} mt={"60px"}>
                <AlbumList/>
            </Box>

            <Box component={"section"} mt={"60px"}>
                <PodcastList/>
            </Box>

            <Box component={"section"} mt={"60px"}>
                <AuthorList/>
            </Box>
        </>
    );
};

export default AuthorPage;