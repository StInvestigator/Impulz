import {Box, Button, Typography} from "@mui/material";
import AuthorAverageItem from "../items/author/AuthorAverageItem.tsx";

const authors = [
    "Автор 1",
    "Автор 2",
    "Автор 3",
    "Автор 4",
    "Автор 5",
]

const AuthorList = () => {
    return (
        <Box width={"100%"}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant={"h2"} fontSize={"24px"}>
                    Схожі виконавці
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
                    Дивитись всі
                </Button>
            </Box>
            <Box display={"flex"} marginTop={"20px"} gap={3}>
                {authors.map(author =>
                    <AuthorAverageItem key={author} author={author} itemHeight={360}/>
                )}
            </Box>
        </Box>
    );
};

export default AuthorList;