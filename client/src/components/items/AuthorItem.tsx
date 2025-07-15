import React, {FC} from 'react';
import {Box, Card, Typography} from "@mui/material";

interface AuthorItemProps {
    author: string;
    itemWidth: number;
}

const AuthorItem: FC<AuthorItemProps> = ({author, itemWidth}) => {
    return (
        <Card
            sx={{
                minWidth: itemWidth,
                bgcolor: "#ABA5A5",
                boxShadow: "none",
                color: 'black',
                flexShrink: 0,
            }}
        >
            <Box width={itemWidth} height={itemWidth} borderRadius={"50%"} bgcolor={"white"}>

            </Box>
            <Box textAlign={"center"} mt={1}>
                <Typography gutterBottom variant="h5" fontWeight={600} sx={{ color: "black", fontSize: "14px" }}>
                    {author}
                </Typography>
                <Typography variant="body2" fontWeight={400} sx={{ color: "black", fontSize: "12px" }}>
                    Виконавець
                </Typography>
            </Box>
        </Card>
    );
};

export default AuthorItem;