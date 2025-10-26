import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import type { TrackSimpleDto } from "../models/DTO/track/TrackSimpleDto.ts";
import { motion } from 'framer-motion';
import PlayerTrackItem from './items/track/PlayerTrackItem.tsx';
import {useTranslation} from "react-i18next";
import { useAppDispatch } from '../hooks/redux';
import { setActive } from "../store/reducers/PlayerSlice.ts";

interface FullScreenPlayerProps {
    active: TrackSimpleDto;
    playlist: TrackSimpleDto[];
    currentTrackIndex: number;
    currentTime: number;
    duration: number;
    pause: boolean;
    onClose: () => void;
    onTrackSelect?: (index: number) => void;
    onCloseFullScreen?: () => void;
}

const NAVBAR_HEIGHT = 48;

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({
    active,
    playlist,
    currentTrackIndex,
    onTrackSelect,
    onCloseFullScreen
}) => {
    const { t } = useTranslation("other");
    const dispatch = useAppDispatch();

    const nextInQueue = playlist.slice(currentTrackIndex + 1);

    const handleTrackSelection = (index: number) => {
        if (onTrackSelect) {
            onTrackSelect(index);
        } else {
            if (index >= 0 && index < playlist.length) {
                dispatch(setActive(playlist[index]));
            }
        }
    };

    const handleCurrentTrackClick = () => {
        handleTrackSelection(currentTrackIndex);
    };

    return (
        <motion.div
            initial={{
                y: 40
            }}
            animate={{
                y: 0
            }}
            transition={{
                duration: 0.5,
                ease: "easeOut"
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `833.5px`,
                    marginTop: `${NAVBAR_HEIGHT}px`,
                    backgroundColor: 'white',
                    padding: '2px',
                    display: 'flex',
                    flexDirection: 'row',
                    zIndex: 10,
                    gap: '2px',
                    boxSizing: 'border-box',
                }}
            >
                {/* Левая часть */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 4,
                        backgroundColor: '#392347',
                        height: '100%',
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                        borderRadius: "10px"
                    }}
                >
                    {/* Обложка */}
                    <motion.div
                        initial={{scale: 0.9, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{duration: 0.4}}
                    >
                        <Box
                            component="img"
                            src={active.imgUrl ?? '/placeholder-artwork.png'}
                            alt="album-cover"
                            sx={{
                                width: '642px',
                                height: '634px',
                                borderRadius: '10px',
                                boxShadow: '0 0 40px rgba(0,0,0,0.4)',
                                objectFit: 'cover',
                            }}
                        />
                    </motion.div>
                </Box>

                {/* Правая часть */}
                <Box
                    sx={{
                        width: '450px',
                        backgroundColor: 'var(--dark-purple)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto',
                        height: '100%',
                        boxSizing: 'border-box',
                        borderRadius: "10px"
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#392347",
                            height: "60px",
                            borderRadius: "10px",
                            margin: '8px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                color: "white",
                                fontSize: "20px",
                                marginLeft: '24px',
                                fontFamily: "Manrope",
                                fontWeight: "700"
                            }}
                        >
                            {t("title-queue")}
                        </Typography>
                    </Box>

                    <Box padding={"12px"}>
                        <Box
                            sx={{
                                marginBottom: "40px"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "white",
                                    fontSize: "16px",
                                    fontFamily: "Manrope",
                                    fontWeight: "700",
                                    marginLeft: "12px",
                                    marginBottom: "24px"
                                }}
                            >
                                {t("title-plays")}
                            </Typography>

                            <PlayerTrackItem
                                track={active}
                                index={currentTrackIndex}
                                currentTrackIndex={currentTrackIndex}
                                onTrackClick={handleCurrentTrackClick}
                                onCloseFullScreen={onCloseFullScreen}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "24px"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "white",
                                    fontSize: "16px",
                                    fontFamily: "Manrope",
                                    fontWeight: "700",
                                    marginLeft: "12px",
                                }}
                            >
                                {t("title-next-in-queue")}
                            </Typography>

                            <Button
                                sx={{
                                    color: "var(--orange-peel)",
                                    textTransform: "none",
                                    fontFamily: "Manrope",
                                    fontSize: "14px",
                                    height: "16px",
                                }}
                            >
                                {t("title-clear-queue")}
                            </Button>
                        </Box>

                        {nextInQueue.map((track, offsetIndex) => {
                            const realIndex = currentTrackIndex + 1 + offsetIndex;
                            return (
                                <PlayerTrackItem
                                    key={track.id}
                                    track={track}
                                    index={realIndex}
                                    currentTrackIndex={currentTrackIndex}
                                    onTrackClick={() => handleTrackSelection(realIndex)}
                                    onCloseFullScreen={onCloseFullScreen}
                                />
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </motion.div>
    );
};

export default FullScreenPlayer;