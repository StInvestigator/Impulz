import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import playImage from "../../images/play.png";

const TopSelectionsItem = () => {
    return (
        <Box width={"100%"} height={"500px"}>
            <Box height={"108px"} display={"flex"} padding={"24px"} bgcolor={"#ABA5A5"}>
                <Box borderRadius={"50%"} width={"108px"} height={"100%"} bgcolor={"white"}>

                </Box>
                <Box height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} marginLeft={"24px"}>
                    <Box>
                        <Typography component={"h3"}>
                            Тіна Кароль
                        </Typography>
                        <Typography component={"h4"}>
                            Виконавець
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box height={"70%"} bgcolor={"#919496"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <IconButton sx={{padding: 0}}>
                    <Box component={"img"} src={playImage} borderRadius={'50%'} width={"80px"}
                         height={"80px"}/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default TopSelectionsItem;