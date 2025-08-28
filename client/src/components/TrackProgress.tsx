import { Box } from '@mui/material';
import React from 'react';

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e:never) => void
}

const TrackProgress: React.FC<TrackProgressProps> =
    ({
         left, right, onChange
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
                />
                <Box>{left} / {right}</Box>
            </Box>
        );
    };

export default TrackProgress;