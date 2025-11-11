import {type FC, useState} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import diskImage from "../../assets/disk.svg"
import spiraleImage from "../../assets/spirale.svg"
import { usePlayTrack } from "../../hooks/usePlayTrack.tsx";
import { useAppDispatch } from "../../hooks/redux.ts";
import { fetchPopularTracksByGenre } from "../../store/reducers/action-creators/tracks.ts";
import playImage from "../../assets/play.svg";

interface GenreItemProps {
    genre: string;
    index: number;
    genreId: number;
}

const TopFiveGenreItem: FC<GenreItemProps> = ({genre, index, genreId}) => {

    const rotate = index % 2 !== 0 ? 'rotate(0deg)' : 'rotate(180deg)';
    const { playTrackList } = usePlayTrack();
    const dispatch = useAppDispatch();
    const [isDiskHovered, setIsDiskHovered] = useState(false);

    const handlePlay = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const result = await dispatch(fetchPopularTracksByGenre({
            genreId: genreId,
            page: 0,
            size: 1000
        }));

        if (fetchPopularTracksByGenre.fulfilled.match(result)) {
            playTrackList(result.payload, 0);
        }
    }

    return (
        <Box display={"flex"} mt={"20px"} alignItems={"center"} height={"160px"} sx={{
            transform: rotate,
        }}>
            <Box borderRadius={'1000px'} width={"100%"} display={"flex"} bgcolor={"var(--columbia-blue)"} height={"160px"}>
                <Box
                    borderRadius={'1000px'}
                    width={"60%"}
                    height={"100%"}
                    sx={{
                        backgroundImage: `url(${spiraleImage})`,
                        backgroundColor: "var(--dark-purple)",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}
                >
                    <IconButton
                        disableRipple
                        sx={{
                            padding: 0,
                            position: 'absolute',
                            width: "160px",
                            height: "160px",
                            left: -1
                        }}
                        onClick={handlePlay}
                        onMouseEnter={() => setIsDiskHovered(true)}
                        onMouseLeave={() => setIsDiskHovered(false)}
                    >
                        <Box
                            component={"img"}
                            src={diskImage}
                            borderRadius={'50%'}
                            width={"160px"}
                            height={"160px"}
                            sx={{
                                transition: 'transform 0.3s ease',
                                transform: isDiskHovered ? 'scale(1.1)' : 'scale(1)',
                            }}
                        />

                        <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            sx={{
                                transform: `translate(-50%, -50%) ${rotate}`,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                width: '50px',
                                height: '50px',
                                '&:hover': {
                                    transform: `translate(-50%, -50%) scale(1.1) ${rotate}`,
                                },
                                marginLeft: "-1px"
                            }}
                        >
                            <Box
                                component="img"
                                src={playImage}
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                }}
                            />
                        </Box>
                    </IconButton>
                </Box>
                <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} width={"40%"} boxSizing={"border-box"} padding={3}>
                    <Typography variant={"h2"} textAlign={"center"} sx={{
                        transform: rotate,
                    }}>
                        {genre}
                    </Typography>
                </Box>
            </Box>
            <Box bgcolor={"var(--orange-peel)"} marginLeft={"24px"} display={"flex"} justifyContent={"center"} alignItems={"center"} width={"135px"} height={"68px"} borderRadius={"50px"}>
                <Typography variant={"h2"} mb={"5px"} textAlign={"center"} sx={{
                    transform: rotate,
                }}>
                    {index}
                </Typography>
            </Box>
        </Box>
    );
};

export default TopFiveGenreItem;