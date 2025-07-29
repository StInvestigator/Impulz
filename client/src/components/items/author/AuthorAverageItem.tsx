import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import type {FC} from "react";

interface AuthorItemProps {
    author: string;
    itemHeight: number;
}

const AuthorAverageItem: FC<AuthorItemProps> = ({author, itemHeight}) => {
    return (
        <Box width="292px" height={`${itemHeight}px`} boxSizing={"border-box"} bgcolor={"#B9B9B9"} borderRadius={"1000px 1000px 0 0"} >
            <Box bgcolor="gray" mx={"auto"} width="270px" height={'270px'} borderRadius={"50%"} >

            </Box>
                <Box display="flex" justifyContent="space-between" padding={"24px"} boxSizing={"border-box"} alignItems="center" width={"100%"}>
                    <Box>
                        <Typography variant={"h3"} gutterBottom sx={{ color: "black"}}>
                            {author}
                        </Typography>
                        <Typography variant={"h4"} sx={{ color: "black"}}>
                            Альбом &middot; Rihana
                        </Typography>
                    </Box>
                    <IconButton sx={{padding: 0}}>
                        <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                             height={"30px"}/>
                    </IconButton>
                </Box>
        </Box>
    );
};

export default AuthorAverageItem;