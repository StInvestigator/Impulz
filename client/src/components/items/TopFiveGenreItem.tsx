import React, {FC} from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import diskImage from "../../images/disk.svg"

interface GenreItemProps {
    genre: string;
    index: number;
}

const TopFiveGenreItem: FC<GenreItemProps> = ({genre, index}) => {
    return (
        <Box mt={"20px"}>
        {index % 2 !== 0
            ?
            <Box display={"flex"} bgcolor={"#D9D9D9"} height={"160px"}>
                <Box borderRadius={'1000px 0px 100px 1000px'} width={"100%"} display={"fles"} bgcolor={"#919496"} >
                    <Box borderRadius={'1000px'} bgcolor={"white"} width={"60%"} height={"100%"}>
                        <IconButton sx={{padding: 0}}>
                            <Box component={"img"} src={diskImage} borderRadius={'50%'} width={"160px"}
                                 height={"160px"}/>
                        </IconButton>
                    </Box>
                    <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} width={"40%"} boxSizing={"border-box"} padding={3}>
                        <Typography variant={"h2"} fontSize={"36px"} fontWeight={700} color={"white"}
                                    textAlign={"center"}>
                            {genre}
                        </Typography>
                    </Box>
                </Box>
                <Box bgcolor={"black"} width={"135px"} height={"80px"} borderRadius={"0 10px 10px 0"}>
                    <Typography variant={"h2"} fontSize={"64px"} fontWeight={700} mb={"5px"} color={"white"}
                                textAlign={"center"}>
                        {index}
                    </Typography>
                </Box>
            </Box>
            :
            <Box display={"flex"} bgcolor={"#D9D9D9"} height={"160px"}>
                <Box bgcolor={"black"} width={"135px"} height={"80px"} borderRadius={"10px 0 0 10px"}>
                    <Typography variant={"h2"} fontSize={"64px"} fontWeight={700} mb={"5px"} color={"white"}
                                textAlign={"center"}>
                        {index}
                    </Typography>
                </Box>
                <Box borderRadius={'0px 1000px 1000px 100px'} width={"100%"} display={"flex"} justifyContent={"flex-end"} bgcolor={"#919496"}>
                    <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"} width={"40%"} boxSizing={"border-box"} padding={3}>
                        <Typography variant={"h2"} fontSize={"36px"} fontWeight={700} color={"white"}
                                    textAlign={"center"}>
                            {genre}
                        </Typography>
                    </Box>
                    <Box borderRadius={'1000px'} bgcolor={"white"} width={"60%"} display={"flex"} justifyContent={"flex-end"}>
                        <IconButton sx={{padding: 0}}>
                            <Box component={"img"} src={diskImage} borderRadius={'50%'} width={"160px"}
                                 height={"160px"}/>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        }
        </Box>
    );
};

export default TopFiveGenreItem;