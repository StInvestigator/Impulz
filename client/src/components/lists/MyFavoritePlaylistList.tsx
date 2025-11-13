import { memo, useEffect, useMemo } from "react";
import { List, CircularProgress, Box } from "@mui/material";
import playlistImage from "../../assets/PlaylistDefaultImage.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { fetchFavoritePlaylists } from "../../store/reducers/action-creators/playlist.ts";
import { useKeycloak } from "@react-keycloak/web";
import MyFavPlaylistsItem from "../items/playlist/MyFavPlaylistItem.tsx";
import type { PlaylistDto } from "../../models/PlaylistDto.ts";

const MyFavoritePlaylistList = () => {
    const dispatch = useAppDispatch();
    const { favoritePlaylists, isSidebarLoading, error } = useAppSelector(state => state.playlist);
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.sub;

    useEffect(() => {
        if (userId) {
            dispatch(fetchFavoritePlaylists({ userId }));
        }
    }, [userId, dispatch]);

    const memoFavoritePlaylists = useMemo(() => {
        return Array.isArray(favoritePlaylists) ? favoritePlaylists : [];
    }, [favoritePlaylists]);

    if (isSidebarLoading && (!memoFavoritePlaylists || memoFavoritePlaylists.length === 0)) {
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
            {keycloak.authenticated && memoFavoritePlaylists.length > 0 && (
                memoFavoritePlaylists.map((playlist: PlaylistDto) => (
                    <MyFavPlaylistsItem
                        key={playlist.id}
                        playlist={playlist}
                        defaultImage={playlistImage}
                    />
                ))
            )}
        </List>
    );
};

export default memo(MyFavoritePlaylistList);
