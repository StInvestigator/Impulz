import { Box } from "@mui/material";
// import AuthorAverageItem from "../items/author/AuthorAverageItem.tsx";
import type { FC } from "react";
import type {AuthorSimpleDto} from "../../models/DTO/AuthorSimpleDto.ts";
import AuthorAverageItem from "../items/author/AuthorAverageItem.tsx";

interface AlbumListProps {
    authors: AuthorSimpleDto[]
}

const AuthorList: FC<AlbumListProps> = ({ authors = [] }) => {
    return (
        <Box display={"grid"} sx={{
            gridTemplateColumns: "repeat(5, 1fr)"
        }} gap={3}>
            {authors.map((author) =>
                <AuthorAverageItem key={author.id} author={author}/>
            )}
        </Box>
    );
};

export default AuthorList;