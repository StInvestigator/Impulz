import type {FC} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../assets/play.svg";

interface CowerProps {
    type: "myPlaylist" | "publicPlaylist" | "album"
}

const Cover: FC<CowerProps> = ({type}) => {
    return (
        <Box bgcolor={"#D9D9D9"} width={"100%"} height={"450px"} padding={"50px"} boxSizing={"border-box"}>
            <Box display={"flex"} alignItems={"center"}>
                <Box width={"350px"} height={"350px"} display={"flex"} bgcolor={"#A48080"} justifyContent={"center"} alignItems={"center"}>
                    <IconButton sx={{padding: 0}}>
                        <Box component={"img"} src={playImage} borderRadius={'50%'} width={"80px"}
                             height={"80px"}/>
                    </IconButton>
                </Box>
                <Box flex={1} marginLeft={"100px"}>
                    <Typography variant={"mainSbL"} fontSize={"24px"}>
                        {type === "myPlaylist" && "Мій плейлист"}
                        {type === "publicPlaylist" && "Публічний плейлист"}
                        {type === "album" && "Альбом"}
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,       // максимум 2 строки
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            wordBreak: "break-word",
                            whiteSpace: "normal"      // обязательно, чтобы текст переносился
                        }}
                    >
                        Нотатки з безкрайніх сесій у пошуках тиші, якої не існує сссссссccccccccccccc
                    </Typography>

                </Box>
            </Box>
        </Box>
    );
};

export default Cover;