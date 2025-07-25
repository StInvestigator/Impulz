import {Box, Button, Typography} from "@mui/material";
import TopSelectionsList from "./lists/TopSelectionsList.tsx";

const TopSelections = () => {
    return (
        <Box width={"100%"}>
            <Box display={"flex"} justifyContent={"space-between"} px={3}>
                <Typography variant={"h1"} fontSize={"36px"} fontWeight={700}>
                    Топ добірок
                </Typography>
                <Button sx={{
                    height: "32px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "black"
                }}>
                    Дивитись всі
                </Button>
            </Box>
            <Box display={"grid"} sx={{
                gridTemplateColumns: {
                    md: "repeat(4, 1fr)",
                    sm: "repeat(3, 1fr)",
                    xs: "repeat(2, 1fr)"
                }
            }} gap={3}>
                <TopSelectionsList/>
            </Box>
        </Box>
    );
};

export default TopSelections;