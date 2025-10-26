import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import { type FC, useRef, useState, useLayoutEffect, useCallback } from "react";
import { usePlayTrack } from "../../../hooks/usePlayTrack.tsx";
import type { TrackSimpleDto } from "../../../models/DTO/track/TrackSimpleDto.ts";
import { TrackContextMenu } from "../../contextMenu/TrackContextMenu.tsx";
import { useMediaContextMenu } from "../../../hooks/useMediaContextMenu.ts";
import { useNavigate } from "react-router-dom";

interface TrackItemProps {
    track: TrackSimpleDto;
    index?: number;
}

const TrackSmallItem: FC<TrackItemProps> = ({ track, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState(0);
    const { playSingle } = usePlayTrack();
    const { contextMenu, handleContextMenu, handleCloseContextMenu } = useMediaContextMenu();

    const handlePlay = useCallback(() => {
        playSingle(track);
    }, [playSingle, track]);

    useLayoutEffect(() => {
        const updateCardWidth = () => {
            if (cardRef.current) {
                setCardWidth(cardRef.current.getBoundingClientRect().width);
            }
        };

        updateCardWidth();

        window.addEventListener('resize', updateCardWidth);
        return () => window.removeEventListener('resize', updateCardWidth);
    }, []);

    const formatDuration = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }, []);

    const isMobileLayout = cardWidth <= 800;

    return (
        <>
            <Box
                ref={cardRef}
                display="flex"
                height={isMobileLayout ? "80px" : "60px"}
                width="100%"
                borderRadius="10px"
                overflow="hidden"
                onContextMenu={(e) => handleContextMenu(e, track.id)}
                sx={{
                    transition: 'height 0.2s ease-in-out',
                    '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                    },
                    cursor: 'context-menu',
                }}
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
                    <Typography variant="h2" component="span">
                        {index !== undefined ? index + 1 : '#'}
                    </Typography>
                </Box>

                {/* Основной контент */}
                <Box
                    bgcolor="var(--orange-peel-20)"
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    px="24px"
                    gap={2}
                >
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

                    {isMobileLayout ? (
                        <MobileLayout track={track} />
                    ) : (
                        <DesktopLayout track={track} />
                    )}

                    {/* Длительность и кнопка воспроизведения */}
                    <Box display="flex" alignItems="center" gap={2} flexShrink={0}>
                        <Typography variant="mainSbL">
                            {formatDuration(track.durationSec || 0)}
                        </Typography>

                        <IconButton
                            sx={{
                                padding: 0,
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.1)'
                                }
                            }}
                            onClick={handlePlay}
                            disableRipple={false}
                        >
                            <Box
                                component="img"
                                src={playImage}
                                borderRadius="50%"
                                width="40px"
                                height="40px"
                                sx={{ transition: 'transform 0.2s' }}
                            />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            {/* Контекстное меню */}
            <TrackContextMenu
                contextMenu={contextMenu}
                onClose={handleCloseContextMenu}
                track={track}
            />
        </>
    );
};

const MobileLayout: FC<{ track: TrackSimpleDto }> = ({ track }) => (
    <Box overflow="hidden" display="flex" flexDirection="column" sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="mainSbL" noWrap>
            {track.title || "Без названия"}
        </Typography>
        <AuthorLinks authors={track.authors} />
    </Box>
);

const DesktopLayout: FC<{ track: TrackSimpleDto }> = ({ track }) => {
    const route = useNavigate();
    return (
        <>
            <Typography variant="mainSbL" noWrap sx={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
                {track.title || "Без названия"}
            </Typography>

            <Box sx={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center' }}>
                <AuthorLinks authors={track.authors} />
            </Box>

            <Box sx={{
                flex: 1,
                color: 'inherit',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline', color: '#1976d2' },
            }}
                onClick={() => route(`/album/${track.albumId}`)}>
                <Typography variant="mainRM" noWrap>
                    {track.album || "Error"}
                </Typography>
            </Box>
        </>
    )
};

const AuthorLinks: FC<{ authors: TrackSimpleDto['authors'] }> = ({ authors }) => {
    const route = useNavigate();

    if (!authors || authors.length === 0) {
        return (
            <Typography variant="mainRM">
                Неизвестный исполнитель
            </Typography>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
            {authors.map((author, index) => (
                <Box key={author.id} sx={{
                    display: 'flex', alignItems: 'center', color: 'inherit',
                    '&:hover': {
                        textDecoration: 'underline',
                        color: '#1976d2',
                        cursor: "pointer"
                    }
                }}
                    onClick={() => route(`/author/${author.id}`)}>
                    <Typography variant="mainRM" noWrap>
                        {author.name}
                    </Typography>
                    {index < authors.length - 1 && (
                        <Typography variant="mainRM" sx={{ mx: 0.5 }}>,</Typography>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default TrackSmallItem;