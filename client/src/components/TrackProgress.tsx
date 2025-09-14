import { Box } from '@mui/material';
import React from 'react';

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const TrackProgress: React.FC<TrackProgressProps> =
    ({
         left, right, onChange, disabled = false
     }) => {
        return (
            <Box style={{display: 'flex'}}>
                <Box
                    component={"input"}
                    type="range"
                    min={0}
                    max={right}
                    value={left}
                    onChange={onChange}
                    disabled={disabled}
                    style={{ opacity: disabled ? 0.5 : 1 }}
                />
                <Box>{left} / {right}</Box>
            </Box>
        );
    };

export default TrackProgress;