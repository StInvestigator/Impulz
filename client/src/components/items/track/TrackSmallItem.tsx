import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import { type FC, useRef, useState, useLayoutEffect } from "react";

interface TrackItemProps {
    track: string;
}

const TrackSmallItem: FC<TrackItemProps> = ({ track }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState(0);

    useLayoutEffect(() => {
        if (cardRef.current) {
            setCardWidth(cardRef.current.getBoundingClientRect().width);
        }
    }, []);

    return (
        <Box
            ref={cardRef}
            display="flex"
            height="60px"
            width="100%"
            borderRadius="10px"
            overflow="hidden"
        >
            {/* Номер */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="black"
                width="80px"
                flexShrink={0}
            >
                <Typography variant="h2" color="white">
                    {track}
                </Typography>
            </Box>

            {/* Обложка + остальной контент */}
            <Box
                bgcolor="#D9D9D9"
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px="24px"
            >
                {/* Обложка трека */}
                <Box
                    bgcolor="#6F5E5E"
                    height="60px"
                    width="60px"
                    borderRadius="4px"
                    flexShrink={0}
                />

                {cardWidth <= 800 ? (
                    <Box
                        overflow="hidden"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        sx={{ flexBasis: "60%", minWidth: 0 }}
                    >
                        <Typography
                            variant="mainSbL"
                            noWrap
                            maxWidth={"100%"}
                        >
                            Constellations
                        </Typography>
                        <Typography
                            variant="mainRM"
                            noWrap
                            maxWidth={"100%"}
                        >
                            rnvjnjnjdkmkvmckmmooooooooooooo[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Typography
                            variant="mainSbL"
                            noWrap
                            textAlign="center"
                            sx={{ flexBasis: "20%", minWidth: 0 }}
                        >
                            шоошшшшшшшшшшшшшшщлщлщлщjjj
                        </Typography>

                        <Typography
                            variant="mainRM"
                            noWrap
                            textAlign="center"
                            sx={{ flexBasis: "20%", minWidth: 0 }}
                        >
                            ототцуаотцоутаоцkkkkkkkkk
                        </Typography>

                        <Typography
                            variant="mainRM"
                            noWrap
                            textAlign="center"
                            sx={{ flexBasis: "20%", minWidth: 0 }}
                        >
                            отацотуоцтаоцту
                        </Typography>
                    </>
                )}

                <Typography variant="mainSbL" flexShrink={0}>
                    01 : 53
                </Typography>

                <IconButton sx={{ padding: 0 }}>
                    <Box
                        component="img"
                        src={playImage}
                        borderRadius="50%"
                        width="40px"
                        height="40px"
                    />
                </IconButton>
            </Box>
        </Box>
    );
};

export default TrackSmallItem;
