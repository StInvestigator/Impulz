import { memo, useEffect, useMemo } from "react";
import { List, CircularProgress, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { fetchFavoriteAlbums } from "../../store/reducers/action-creators/album.ts";
import { useKeycloak } from "@react-keycloak/web";
import type { AlbumSimpleDto } from "../../models/DTO/album/AlbumSimpleDto.ts";
import FavAlbumItem from "../items/album/FavAlbumItem.tsx";

const MyAlbumList = () => {
    const dispatch = useAppDispatch();
    const { favoriteAlbums, isLoading, error } = useAppSelector(state => state.album);
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.sub;

    useEffect(() => {
        if (userId) {
            dispatch(fetchFavoriteAlbums({ userId }));
        }
    }, [userId, dispatch]);

    const memoFavoriteAlbums = useMemo(() => {
        return Array.isArray(favoriteAlbums) ? favoriteAlbums : [];
    }, [favoriteAlbums]);

    if (isLoading && (!memoFavoriteAlbums || memoFavoriteAlbums.length === 0)) {
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
            {keycloak.authenticated && memoFavoriteAlbums.length > 0 && (
                memoFavoriteAlbums.map((album: AlbumSimpleDto) => (
                    <FavAlbumItem
                        key={album.id}
                        album={album}
                    />
                ))
            )}
        </List>
    );
};

export default memo(MyAlbumList);
