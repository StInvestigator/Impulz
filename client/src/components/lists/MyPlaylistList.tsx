import { memo, useEffect, useMemo } from "react";
import { List, CircularProgress, Box } from "@mui/material";
import playlistImage from "../../assets/PlaylistDefaultImage.svg";
import MyPlaylistItem from "../items/playlist/MyPlaylistItem.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { fetchPlaylistsOwnByUserId } from "../../store/reducers/action-creators/playlist.ts";
import { useKeycloak } from "@react-keycloak/web";
import type { PlaylistSimpleDto } from "../../models/DTO/PlaylistSimpleDto.ts";

const MyPlaylistList = () => {
    const dispatch = useAppDispatch();
    const { playlistsOwnByCurrentUser, isSidebarLoading, error } = useAppSelector(state => state.playlist);
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.sub;

    useEffect(() => {
        if (userId) {
            dispatch(fetchPlaylistsOwnByUserId({ userId }));
        }
    }, [userId, dispatch]);

    const reversedPlaylists = useMemo(() => {
        return Array.isArray(playlistsOwnByCurrentUser) ? [...playlistsOwnByCurrentUser].reverse() : [];
    }, [playlistsOwnByCurrentUser]);

    if (isSidebarLoading && (!reversedPlaylists || reversedPlaylists.length === 0)) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <List disablePadding>
            {keycloak.authenticated && Array.isArray(reversedPlaylists) && reversedPlaylists.length > 0 && (
                reversedPlaylists.map((playlist: PlaylistSimpleDto) => (
                    <MyPlaylistItem
                        key={playlist.id}
                        playlist={playlist}
                        defaultImage={playlistImage}
                    />
                ))
            )}
        </List>
    );
};

export default memo(MyPlaylistList);
