import type { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../assets/play.svg";
import pushPinImage from "../assets/pushPin.svg"
import bgCoverImg from "../assets/bg-cover.svg";

interface CoverProps {
    type: "myPlaylist" | "publicPlaylist" | "privatePlaylist" | "album"; // Добавьте "privatePlaylist"
    title: string;
    authorName: string;
    year?: number;
    trackCount?: number;
    duration?: string;
    imgUrl?: string;
}

const Cover: FC<CoverProps> = ({
                                   type,
                                   title,
                                   authorName,
                                   year,
                                   trackCount,
                                   duration,
                                   imgUrl
                               }) => {
    return (
        <Box
            width={"100%"}
            height={"450px"}
            padding={"50px"}
            boxSizing={"border-box"}
            position={"relative"}
            sx={{ 
                backgroundColor: "var(--dark-purple)",
            }}
        >
            <Box component={"img"} src={bgCoverImg} position={"absolute"} top={0} left={0} width={"100%"} height={"100%"} />
            <Box display={"flex"} alignItems={"center"} zIndex={2} position={"relative"} height={"100%"}>
                <Box
                    width={"350px"}
                    height={"350px"}
                    display={"flex"}
                    bgcolor={"#A48080"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexShrink={0}
                    sx={{
                        backgroundImage: `url(${imgUrl ? imgUrl : ""})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <IconButton sx={{ padding: 0 }}>
                        <Box
                            component={"img"}
                            src={playImage}
                            borderRadius={"50%"}
                            width={"80px"}
                            height={"80px"}
                        />
                    </IconButton>
                </Box>
                <Box flex={1} marginLeft={"100px"} marginTop={"auto"} display={"flex"} flexDirection={"column"} gap={3}>
                    <Typography variant={"mainSbL"} fontSize={"24px"} color="var(--columbia-blue)">
                        {type === "myPlaylist" && "Мій плейлист"}
                        {type === "publicPlaylist" && "Публічний плейлист"}
                        {type === "privatePlaylist" && "Приватний плейлист"} {/* Добавьте эту строку */}
                        {type === "album" && "Альбом"}
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            wordBreak: "break-word",
                            whiteSpace: "normal",
                            color: "var(--orange-peel)"
                        }}
                    >
                        {title}
                    </Typography>
                    <Box display={"flex"} height={"52px"} justifyContent={"flex-start"} alignItems={"center"} gap={1} color={"var(--columbia-blue)"}>
                        <Box bgcolor={"#D3A8A8"} width={"52px"} height={"52px"} borderRadius={"50%"}/>
                        <Box component="img" src={pushPinImage} width={"20px"} height={"20px"}/>
                        <Typography variant={"mainSbL"} fontSize={"32px"} noWrap sx={{ flexBasis: "50%", minWidth: 0 }}>
                            {authorName}
                        </Typography>
                        {year && (
                            <Typography variant={"mainRL"} fontSize={"24px"}>
                                {year}
                            </Typography>
                        )}
                        {trackCount && (
                            <Typography variant={"mainRL"} fontSize={"24px"}>
                                {trackCount} пісень
                            </Typography>
                        )}
                        {duration && (
                            <Typography variant={"mainRL"} fontSize={"24px"}>
                                {duration}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Cover;