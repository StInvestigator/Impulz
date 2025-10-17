import Box from '@mui/material/Box';
import { BG_DIAMETER } from './constants';

const BackdropCircle = () => (
  <Box
    position={"absolute"}
    top={"50%"}
    left={"50%"}
    borderRadius={"50%"}
    sx={{
      width: `${BG_DIAMETER}px`,
      aspectRatio: 1,
      transform: 'translate(-50%, -50%)',
      bgcolor: 'rgba(255, 255, 255, 0.15)',
      zIndex: (theme) => theme.zIndex.drawer + 2,
      pointerEvents: 'none',
    }}
  />
);

export default BackdropCircle;


