import { Box, IconButton, Typography, Link } from "@mui/material";
import playImage from "../../../assets/play.svg";
import { type FC, useRef, useState, useLayoutEffect } from "react";
import type {TrackSimpleDto} from "../../../models/DTO/TrackSimpleDto.ts";
import {usePlayTrack} from "../../../hooks/usePlayTrack.tsx";

interface TrackItemProps {
    track: TrackSimpleDto;
    index?: number;
}

const TrackSmallItem: FC<TrackItemProps> = ({ track, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState(0);
    const { playSingle } = usePlayTrack();
    useLayoutEffect(() => {
        if (cardRef.current) {
            setCardWidth(cardRef.current.getBoundingClientRect().width);
        }
    }, []);

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Box
            ref={cardRef}
            display="flex"
            height= {cardWidth <= 800 ? "80px" : "60px"}
            width="100%"
            borderRadius="10px"
            overflow="hidden"
        >
            {/* Номер */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="var(--columbia-blue)"
                width="80px"
                flexShrink={0}
            >
                <Typography variant="h2">
                    {index !== undefined ? index + 1 : '#'}
                </Typography>
            </Box>

            {/* Обложка + остальной контент */}
            <Box
                bgcolor="var(--orange-peel-20)"
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px="24px"
            >
                {cardWidth <= 800 ? (
                    <>
                        {/* Обложка трека */}
                        <Box
                            bgcolor="grey"
                            height="60px"
                            width="60px"
                            borderRadius="4px"
                            flexShrink={0}
                            sx={{
                                backgroundImage: track.imgUrl ? `url(${track.imgUrl})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
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
                                {track.title || "Без названия"}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                                {track.authors && track.authors.length > 0 ? (
                                    track.authors.map((author, authorIndex) => (
                                        <Box key={author.id} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Link
                                                href={`/author/${author.id}`}
                                                underline="none"
                                                sx={{
                                                    color: 'inherit',
                                                    '&:hover': {
                                                        textDecoration: 'underline',
                                                        color: '#1976d2',
                                                        cursor: 'pointer',
                                                    },
                                                }}
                                            >
                                                <Typography variant="mainRM" noWrap>
                                                    {author.name}
                                                </Typography>
                                            </Link>
                                            {authorIndex < track.authors.length - 1 && (
                                                <Typography variant="mainRM" sx={{ mx: 0.5 }}>,</Typography>
                                            )}
                                        </Box>
                                    ))
                                ) : (
                                    <Typography variant="mainRM">
                                        Неизвестный исполнитель
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </>
                ) : (
                    <>
                        {/* Обложка трека */}
                        <Box
                            bgcolor="grey"
                            height="60px"
                            width="60px"
                            borderRadius="4px"
                            flexShrink={0}
                            sx={{
                                backgroundImage: track.imgUrl ? `url(${track.imgUrl})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        <Typography
                            variant="mainSbL"
                            noWrap
                            textAlign="center"
                            sx={{ flexBasis: "20%", minWidth: 0 }}
                        >
                            {track.title || "Без названия"}
                        </Typography>

                        <Box sx={{
                            flexBasis: "20%",
                            minWidth: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'nowrap'
                        }}>
                            {track.authors && track.authors.length > 0 ? (
                                track.authors.map((author, authorIndex) => (
                                    <Box key={author.id} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Link
                                            href={`/author/${author.id}`}
                                            underline="none"
                                            sx={{
                                                color: 'inherit',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                    color: '#1976d2',
                                                    cursor: 'pointer',
                                                },
                                            }}
                                        >
                                            <Typography variant="mainRM" noWrap>
                                                {author.name}
                                            </Typography>
                                        </Link>
                                        {authorIndex < track.authors.length - 1 && (
                                            <Typography variant="mainRM" sx={{ mx: 0.5 }}>,</Typography>
                                        )}
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="mainRM" noWrap textAlign="center">
                                    Неизвестный исполнитель
                                </Typography>
                            )}
                        </Box>

                        <Typography
                            variant="mainRM"
                            noWrap
                            textAlign="center"
                            sx={{ flexBasis: "20%", minWidth: 0 }}
                        >
                            {track.album || "Без альбома"}
                        </Typography>
                    </>
                )}

                <Typography variant="mainSbL" flexShrink={0}>
                    {formatDuration(track.durationSec || 0)}
                </Typography>

                <IconButton sx={{ padding: 0 }} onClick={() => playSingle(track)}>
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