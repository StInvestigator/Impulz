import {useState, type FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../assets/play.svg";
import pushPinImage from "../assets/pushPin.svg";
import bgCoverImg from "../assets/bg-cover.svg";
import { useTranslation } from "react-i18next";
import PlaylistDefaultImage from "../assets/PlaylistDefaultImage.svg";

interface CoverProps {
    type: "myPlaylist" | "publicPlaylist" | "privatePlaylist" | "album";
    title: string;
    OwnerNames: string[];
    OwnerImageUrl: string;
    year?: number;
    trackCount?: number;
    duration?: string;
    imgUrl?: string;
    handlePlay?: (e: React.MouseEvent<Element, MouseEvent>) => Promise<void>;
}

const Cover: FC<CoverProps> = ({
                                   type,
                                   title = "Без названия",
                                   OwnerNames = [],
                                   OwnerImageUrl = "",
                                   year,
                                   trackCount,
                                   duration,
                                   imgUrl = "",
                                   handlePlay
                               }) => {
    const { t } = useTranslation("other");
    const [isHovered, setIsHovered] = useState(false);

    const safeTitle = title || "Empty";
    const safeOwnerNames = OwnerNames || [];
    const safeOwnerImageUrl = OwnerImageUrl || "";
    const isDefaultImage = !imgUrl || imgUrl === PlaylistDefaultImage;

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
                        backgroundImage: `url(${imgUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: isDefaultImage ? "var(--columbia-blue)" : "transparent",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": {
                            transform: "scale(1.02)",
                        },
                        borderRadius: "10px"
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handlePlay}
                >
                    <IconButton
                        sx={{
                            padding: 0,
                            opacity: isHovered ? 1 : 0,
                            transition: "opacity 0.3s ease, transform 0.2s ease",
                            transform: isHovered ? "scale(1.1)" : "scale(1)",
                            zIndex: 2,
                            "&:hover": {
                                transform: "scale(1.2)",
                            }
                        }}
                        disableRipple={true}
                    >
                        <Box
                            component={"img"}
                            src={playImage}
                            borderRadius={"50%"}
                            width={"80px"}
                            height={"80px"}
                            sx={{
                                filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))",
                            }}
                        />
                    </IconButton>
                </Box>
                <Box flex={1} marginLeft={"100px"} marginTop={"auto"} display={"flex"} flexDirection={"column"} gap={3}>
                    <Typography variant={"mainSbL"} fontSize={"24px"} color="var(--columbia-blue)">
                        {type === "myPlaylist" && t("title-my-playlist")}
                        {type === "publicPlaylist" && t("title-public-playlist")}
                        {type === "privatePlaylist" && t("title-private-playlist")}
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
                        {safeTitle}
                    </Typography>
                    <Box display={"flex"} height={"52px"} justifyContent={"flex-start"} alignItems={"center"} gap={1} color={"var(--columbia-blue)"}>
                        {safeOwnerImageUrl && (
                            <Box
                                component={"img"}
                                src={safeOwnerImageUrl}
                                bgcolor={"#D3A8A8"}
                                width={"52px"}
                                height={"52px"}
                                borderRadius={"50%"}
                                sx={{ objectFit: 'cover' }}
                            />
                        )}
                        <Box component="img" src={pushPinImage} width={"20px"} height={"20px"} />
                        <Typography variant={"mainSbL"} fontSize={"32px"} noWrap sx={{ flexBasis: "50%", minWidth: 0 }}>
                            {safeOwnerNames.join(", ") || "Unknown author"}
                        </Typography>
                        {year && (
                            <Typography variant={"mainRL"} fontSize={"24px"}>
                                {year}
                            </Typography>
                        )}
                        {trackCount !== undefined && trackCount > 0 && (
                            <Typography variant={"mainRL"} fontSize={"24px"}>
                                {trackCount} {t("title-songs")}
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