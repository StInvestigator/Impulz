import {Box} from "@mui/material";
import AuthorAverageItem from "../items/author/AuthorAverageItem.tsx";
import type {FC} from "react";

interface AlbumListProps {
    authors: string[]
}

const AuthorList:FC<AlbumListProps> = ({authors}) => {

    return (
        <Box display={"grid"} sx={{
            gridTemplateColumns: "repeat(5, 1fr)"
        }} gap={3}>
            {authors.map((author, index) =>
                <AuthorAverageItem key={index} author={author}/>
            )}
        </Box>
    );
};

export default AuthorList;