import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import { useCallback, type FC } from "react";
import { usePlayTrack } from "../../../hooks/usePlayTrack.tsx";
import type { TrackSimpleDto } from "../../../models/DTO/track/TrackSimpleDto.ts";
import { useNavigate } from "react-router-dom";

interface TrackTrueSmallItemProps {
    track: TrackSimpleDto;
    itemWidth: number;
    color?: "dark" | "light";
}

const TrackTrueSmallItem: FC<TrackTrueSmallItemProps> = ({ track, itemWidth, color = "light" }) => {

    const { playSingle } = usePlayTrack();
    const route = useNavigate();

    const handlePlay = useCallback(() => {
        playSingle(track);
    }, [playSingle, track]);


    return (
        <Box
            sx={{
                width: itemWidth,
                boxShadow: "none",
                color: 'black',
                flexShrink: 0,
                padding: "4px",
                cursor: "pointer",
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
            }}
            onClick={handlePlay}>
            {/* Контейнер для изображения трека */}
            <Box
                position="relative"
                width={itemWidth}
                height={itemWidth}
                borderRadius={"10px"}
                sx={{
                    backgroundImage: `url(${track.imgUrl || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: track.imgUrl ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                }}
            >
                {/* Кнопка play поверх изображения */}
                <IconButton
                    sx={{
                        padding: 0,
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        }
                    }}
                    disableRipple={true}
                >
                    <Box
                        component={"img"}
                        src={playImage}
                        width={"30px"}
                        height={"30px"}
                    />
                </IconButton>
            </Box>

            {/* Информация о треке */}
            <Box display="flex" flexDirection="column" mt={1} color={color === "dark" ? "var(--dark-purple)" : "var(--orange-peel)"}>
                <Typography
                    gutterBottom
                    variant="mainSbL"
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {track.title}
                </Typography>
                <Typography
                    variant="mainRM"
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <Box onClick={() => route(`/album/${track.albumId}`)} sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }
                    }}>
                        {track.album}
                    </Box>
                    <Box component="span" sx={{ fontSize: '20px', lineHeight: 1 }}>
                        &middot;
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        {track.authors.map((author, index) => (
                            <Box key={author.id} sx={{
                                display: 'flex', alignItems: 'center', color: 'inherit',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }
                            }}
                                onClick={() => route(`/author/${author.id}`)}>
                                {author.name}
                                {index < track.authors.length - 1 && (
                                    <Box component="span" sx={{ mx: '4px' }}>,</Box>
                                )}
                            </Box>
                        ))}
                        {track.authors.length === 0 && "Unknown"}
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
};

export default TrackTrueSmallItem;