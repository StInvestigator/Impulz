import { memo, useEffect, useMemo } from "react";
import { List, CircularProgress, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { useKeycloak } from "@react-keycloak/web";
import { fetchAuthorsByFollower } from "../../store/reducers/action-creators/author.ts";
import type { AuthorSimpleDto } from "../../models/DTO/AuthorSimpleDto.ts";
import FavAuthorItem from "../items/author/FavAuthorItem.tsx";

const MyAuthorList = () => {
    const dispatch = useAppDispatch();
    const { authorsByFollower, isSidebarLoading, error } = useAppSelector(state => state.author);
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.sub;

    useEffect(() => {
        if (userId) {
            dispatch(fetchAuthorsByFollower({ followerId : userId }));
        }
    }, [userId, dispatch]);

    const memoFavoriteAuthors = useMemo(() => {
        return Array.isArray(authorsByFollower) ? authorsByFollower : [];
    }, [authorsByFollower]);

    if (isSidebarLoading && (!memoFavoriteAuthors || memoFavoriteAuthors.length === 0)) {
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
            {keycloak.authenticated && memoFavoriteAuthors.length > 0 && (
                memoFavoriteAuthors.map((author: AuthorSimpleDto) => (
                    <FavAuthorItem
                        key={author.id}
                        author={author}
                    />
                ))
            )}
        </List>
    );
};

export default memo(MyAuthorList);
