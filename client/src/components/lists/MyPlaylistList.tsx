import { List, CircularProgress, Box } from "@mui/material";
import playlistImage from "../../assets/sidebar/playlistImage.svg";
import MyPlaylistItem from "../items/playlist/MyPlaylistItem.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { useEffect } from "react";
import { fetchPlaylistsOwnByUserId } from "../../store/reducers/action-creators/playlist.ts";
import { useKeycloak } from "@react-keycloak/web";
import type { PlaylistSimpleDto } from "../../models/DTO/PlaylistSimpleDto.ts";

const MyPlaylistList = () => {
    const dispatch = useAppDispatch();
    const { playlistsOwnByCurrentUser, isLoading, error } = useAppSelector(state => state.playlist);
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.sub;

    useEffect(() => {
        if (userId) {
            dispatch(fetchPlaylistsOwnByUserId({ userId }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    if (isLoading) {
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
            {keycloak.authenticated && Array.isArray(playlistsOwnByCurrentUser) && playlistsOwnByCurrentUser.length > 0 ? (
                playlistsOwnByCurrentUser.map((playlist: PlaylistSimpleDto) => (
                    <MyPlaylistItem
                        key={playlist.id}
                        playlist={playlist}
                        defaultImage={playlistImage}
                    />
                ))
            ) : (
                <Box padding="8px 16px" color="var(--columbia-blue)" fontSize="14px">
                    No playlists found
                </Box>
            )}
        </List>
    );

};

export default MyPlaylistList;