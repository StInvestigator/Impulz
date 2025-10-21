import React from 'react';
import { useNavigate } from 'react-router-dom';
import FullScreenPlayer from './FullScreenPlayer';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import {Box, Typography} from "@mui/material";
import {setActive} from "../store/reducers/PlayerSlice.ts";

const FullScreenPlayerWrapper: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        active,
        playlist,
        currentTrackIndex,
        currentTime,
        duration,
        pause,
    } = useAppSelector((state) => state.player);

    const handleClose = () => {
        navigate(-1);
    };

    const handleTrackSelect = (index: number) => {
        if (index >= 0 && index < playlist.length) {
            dispatch(setActive(playlist[index]));
        }
    };

    if (!active) {
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '400px',
                color: 'white'
            }}>
                <Typography>No active track</Typography>
            </Box>
        );
    }

    return (
        <>
            <FullScreenPlayer
                active={active}
                playlist={playlist}
                currentTrackIndex={currentTrackIndex}
                currentTime={currentTime}
                duration={duration}
                pause={pause}
                onClose={handleClose}
                onTrackSelect={handleTrackSelect}
            />
        </>
    );
};

export default FullScreenPlayerWrapper;