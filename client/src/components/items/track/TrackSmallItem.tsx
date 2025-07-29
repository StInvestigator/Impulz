import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import type {FC} from "react";

interface TrackItemProps {
    track: string;
}

const TrackSmallItem: FC<TrackItemProps> = ({track}) => {
    return (
        <Box display="flex" height="80px" width="100%">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="black"
                width="80px"
                height="80px"
                borderRadius="10px 0 0 10px"
                flexShrink={0}
            >
                <Typography
                    variant="h2"
                    fontSize="36px"
                    color="white"
                    fontFamily='"Manrope", sans-serif'
                >
                    {track}
                </Typography>
            </Box>


            <Box
                bgcolor="#919496"
                width="100%"
                display="flex"
                alignItems="center"
                px="24px"
                borderRadius={"0 10px 10px 0"}
            >
                <Box
                    bgcolor="#B9B9B9"
                    height="60px"
                    width="60px"
                    flexShrink={0}
                />

                <Box
                    marginLeft="24px"
                    flex="1"
                    minWidth={0}
                    overflow="hidden"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <Typography
                        variant="h3"
                        noWrap
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            flexShrink: 1,
                        }}
                    >
                        Constellations
                    </Typography>
                    <Typography
                        variant="h4"
                        noWrap
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            flexShrink: 1,
                        }}
                    >
                        rnvjnjnjdkmkvmckmmekmckekckcnekJ
                    </Typography>
                </Box>



                <Typography
                    variant="h3"
                    marginLeft="24px"
                    flexShrink={0}
                >
                    03 : 56
                </Typography>

                <IconButton
                    sx={{
                        padding: 0,
                        marginLeft: "24px",
                    }}
                >
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
