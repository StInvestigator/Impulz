import type {FC} from "react";
import {Box, IconButton, Link, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import medalImage from "../../../assets/medal.svg";
import type {TrackSimpleDto} from "../../../models/DTO/TrackSimpleDto.ts";
import {usePlayTrack} from "../../../hooks/usePlayTrack.tsx";

interface TrackItemProps {
    track: TrackSimpleDto;
    itemHeight: number;
    itemWidth?: number;
    isMedal?: boolean;
}

const TrackAverageItem: FC<TrackItemProps> = ({itemWidth, itemHeight, track, isMedal}) => {
    const { playSingle } = usePlayTrack();

    return (
        <Box
            sx={{
                width: itemWidth || "100%",
                height: `${itemHeight}px`,
                position: "relative",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Box
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
                {
                    isMedal &&
                    <Box
                        component="img"
                        color={"white"}
                        position={"absolute"}
                        right={10}
                        top={10}
                        src={medalImage}
                        borderRadius={'50%'}
                        width={"30px"}
                        height={"30px"}
                    />
                }
            </Box>
            <Box
                display={"flex"}
                padding={"24px"}
                width={"100%"}
                height={"88px"}
                boxSizing={"border-box"}
                sx={{
                    background: 'rgba(255, 165, 0, 0.15)',
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
                            <Link
                                onDragStart={(e) => e.preventDefault()}
                                href={`/album/${track.albumId}"`}
                                underline="none"
                                sx={{
                                    color: "var(--orange-peel)",
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    },
                                }}>
                                {track.album}
                            </Link>
                        </Typography>
                    </Box>
                    <IconButton
                        sx={{padding: 0, flexShrink: 0}}
                        onClick={() => playSingle(track)}
                        disableRipple={true}
                    >
                        <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                             height={"30px"}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default TrackAverageItem;