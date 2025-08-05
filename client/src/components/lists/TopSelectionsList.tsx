import TopSelectionsItem from "../items/TopSelectionsItem.tsx";
import {Box} from "@mui/material";

const top_5_genres = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
]

const TopSelectionsList = () => {
    return (
        <Box display={"grid"} sx={{
            gridTemplateColumns: "repeat(4, 1fr)"
        }} gap={3}>
            {top_5_genres.map((index) =>
                <TopSelectionsItem key={index}/>
            )}
        </Box>
    );
};

export default TopSelectionsList;