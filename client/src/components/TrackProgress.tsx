import { Box } from '@mui/material';
import React from 'react';

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    showTime?: boolean;
    width?: string;
}

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const TrackProgress: React.FC<TrackProgressProps> = ({
                                                         left,
                                                         right,
                                                         onChange,
                                                         disabled = false,
                                                         showTime = true,
                                                         width = '100%',
                                                     }) => {
    const safeRight = right > 0 ? right : 1;
    const progressPercentage = right > 0 ? (left / right) * 100 : 0;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                width,
                maxWidth: width,
                minWidth: width,
            }}
        >
            {showTime && (
                <Box sx={{ color: 'white', fontSize: '14px', minWidth: '35px', textAlign: 'right' }}>
                    {formatTime(left)}
                </Box>
            )}

            <Box
                component="input"
                type="range"
                min={0}
                max={safeRight}
                value={left}
                onChange={onChange}
                onInput={onChange}
                disabled={disabled}
                style={{
                    flex: 1,
                    height: '12px',
                    background: 'transparent',
                    outline: 'none',
                    appearance: 'none',
                    cursor: disabled ? 'default' : 'pointer',
                    opacity: disabled ? 0.5 : 1,
                    margin: 0,
                    padding: 0,
                }}
                sx={{
                    '&::-webkit-slider-runnable-track': {
                        height: '4px',
                        background: `linear-gradient(to right, white ${progressPercentage}%, #FF990033 ${progressPercentage}%)`,
                        borderRadius: '2px',
                    },
                    '&::-webkit-slider-thumb': {
                        appearance: 'none',
                        width: '12px',
                        height: '12px',
                        background: 'white',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        boxShadow: '0 0 2px rgba(0,0,0,0.5)',
                        marginTop: '-4px',
                    },
                }}
            />


            {showTime && (
                <Box sx={{ color: 'white', fontSize: '14px', minWidth: '35px', textAlign: 'left' }}>
                    {formatTime(right)}
                </Box>
            )}
        </Box>
    );
};


export default TrackProgress;