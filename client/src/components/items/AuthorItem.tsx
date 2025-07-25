import type {FC} from "react";
import {Box, Card, IconButton, Typography} from "@mui/material";
import playImage from "../../assets/play.svg";

interface AuthorItemProps {
    author: string;
    itemWidth: number;
}

const AuthorItem: FC<AuthorItemProps> = ({author, itemWidth}) => {
    return (
        <Card
            sx={{
                minWidth: itemWidth,
                bgcolor: "#ABA5A5",
                boxShadow: "none",
                color: 'black',
                flexShrink: 0,
            }}
        >
            <Box position={"relative"} width={itemWidth} height={itemWidth} borderRadius={"50%"} bgcolor={"white"}>
                <IconButton sx={{
                    padding: 0,
                    position: "absolute",
                    top: 80,
                    left: 80,
                }}>
                    <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                         height={"30px"}/>
                </IconButton>
            </Box>
            <Box textAlign={"center"} mt={1}>
                <Typography gutterBottom variant="h3">
                    {author}
                </Typography>
                <Typography variant="h4">
                    Виконавець
                </Typography>
            </Box>
        </Card>
    );
};

export default AuthorItem;