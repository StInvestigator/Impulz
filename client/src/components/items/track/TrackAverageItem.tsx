import type { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import { usePlayTrack } from "../../../hooks/usePlayTrack.tsx";
import { useNavigate } from "react-router-dom";
import type { TrackSimpleDto } from "../../../models/DTO/track/TrackSimpleDto.ts";
import { TrackContextMenu } from "../../contextMenu/TrackContextMenu.tsx";
import { useContextMenu } from "../../../hooks/useContextMenu.ts";
import { useAppDispatch } from "../../../hooks/redux.ts";
import { showAlert } from "../../../store/reducers/AlertSlice.ts";
import {useTranslation} from "react-i18next";

interface TrackItemProps {
    track: TrackSimpleDto;
    itemHeight: number;
    itemWidth?: number;
    isMedal?: boolean;
}

const TrackAverageItem: FC<TrackItemProps> = ({ itemWidth, itemHeight, track }) => {
    const { playSingle } = usePlayTrack();
    const route = useNavigate();
    const { contextMenu, handleContextMenu, handleCloseContextMenu } = useContextMenu();
    const dispatch = useAppDispatch();
    const {t} = useTranslation("errors");

    const handlePlayClick = () => {
        try {
            playSingle(track);
        } catch (e : unknown) {
            dispatch(showAlert({
                message: `${t("error-playback")}: ${e}`,
                severity: 'error'
            }));
        }
    };

    const handleAlbumClick = () => {
        route(`/album/${track.albumId}`);
    };

    return (
        <Box
            sx={{
                width: itemWidth || "100%",
                height: `${itemHeight}px`,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                transition: 'height 0.2s ease-in-out',
                '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                },
                cursor: 'context-menu',
            }}
        >
            <Box
                onContextMenu={(e) => handleContextMenu(e, track.id)}
                sx={{
                    backgroundImage: `url(${track.imgUrl})`,
                    backgroundColor: '',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: `${itemHeight}px`,
                    borderRadius: "10px 10px 10px 10px",
                    position: "relative",
                    flexShrink: 0
                }}
            >
            </Box>
            <Box
                display={"flex"}
                padding={"24px"}
                width={"100%"}
                height={"88px"}
                boxSizing={"border-box"}
                sx={{
                    background: 'rgba(65, 51, 18, 0.7)',
                    backdropFilter: 'blur(4px) saturate(120%)',
                    borderRadius: "0 0 10px 10px",
                    border: '1px solid rgba(255, 255, 255, 0.125)',
                }}
                position={"absolute"}
                bottom={0}
                flexShrink={0}
            >
                <Box display="flex" alignItems="center" width={"100%"}>
                    <Box display="flex" flexDirection="column" flexGrow={1} minWidth={0}>
                        <Typography
                            variant={"mainSbL"}
                            gutterBottom
                            sx={{
                                color: "var(--orange-peel)",
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {track.title}
                        </Typography>
                        <Typography
                            variant={"mainRM"}
                            sx={{
                                color: "black",
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            <Typography
                                onClick={handleAlbumClick}
                                sx={{
                                    color: "var(--orange-peel)",
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    },
                                }}>
                                {track.album}
                            </Typography>
                        </Typography>
                    </Box>
                    <IconButton
                        sx={{
                            marginLeft: "10px",
                            padding: 0,
                            flexShrink: 0,
                            transition: 'transform 0.2s ease-in-out',
                            "&:hover": {
                                transform: "scale(1.2)"
                            }
                        }}
                        onClick={handlePlayClick}
                        disableRipple={true}
                    >
                        <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                             height={"30px"} />
                    </IconButton>
                </Box>
            </Box>

            <TrackContextMenu
                contextMenu={contextMenu}
                onClose={handleCloseContextMenu}
                track={track}
            />
        </Box>
    );
};

export default TrackAverageItem;