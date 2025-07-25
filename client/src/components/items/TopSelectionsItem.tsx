import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../../assets/play.svg";
import pushPinImage from "../../assets/pushPin.svg";

const TopSelectionsItem = () => {
    return (
        <Box width={"100%"} height={"500px"}>
            <Box height={"108px"} display={"flex"} padding={"24px"} bgcolor={"#ABA5A5"} borderRadius={"10px 10px 0 0"}>
                <Box borderRadius={"50%"} width={"108px"} height={"100%"} bgcolor={"white"}>

                </Box>
                <Box height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} marginLeft={"24px"}>
                    <Box>
                        <Typography variant={"h3"}>
                            Тіна Кароль
                        </Typography>
                        <Typography variant={"h4"}>
                            <Box component="img" src={pushPinImage} mr={"5px"}/>
                            Виконавець
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box height={"70%"} bgcolor={"#919496"} display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={"0 0 10px 10px"}>
                <IconButton sx={{padding: 0}}>
                    <Box component={"img"} src={playImage} borderRadius={'50%'} width={"80px"}
                         height={"80px"}/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default TopSelectionsItem;