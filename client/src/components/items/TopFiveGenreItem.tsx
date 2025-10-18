import type {FC} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import diskImage from "../../assets/disk.svg"
import spiraleImage from "../../assets/spirale.svg"
import { usePlayTrack } from "../../hooks/usePlayTrack.tsx";
import { useAppDispatch } from "../../hooks/redux.ts";
import { fetchPopularTracksByGenre } from "../../store/reducers/action-creators/tracks.ts";

interface GenreItemProps {
    genre: string;
    index: number;
    genreId: number;
}

const TopFiveGenreItem: FC<GenreItemProps> = ({genre, index, genreId}) => {

    const rotate = index % 2 !== 0 ? 'rotate(0deg)' : 'rotate(180deg)';
       const { playTrackList } = usePlayTrack();
       const dispatch = useAppDispatch();
       
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
            <Box borderRadius={'1000px'} width={"100%"} display={"flex"} bgcolor={"var(--columbia-blue)"} >
                <Box borderRadius={'1000px'} width={"60%"} height={"100%"} sx={{
                    backgroundImage: `url(${spiraleImage})`,
                    backgroundColor: "var(--dark-purple)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <IconButton sx={{padding: 0}}
                    onClick={handlePlay}>
                        <Box component={"img"} src={diskImage} borderRadius={'50%'} width={"160px"}
                                height={"160px"}/>
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