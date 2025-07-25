import {Box} from "@mui/material";

const GenreList = () => {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            bgcolor="#ABA5A5"
            width="100%"
            padding="24px"
            boxSizing="border-box"
            borderRadius={"10px"}
            gap={3} // горизонтальный gap между колонками
        >
            {/* Левая колонка */}
            <Box width="60%" display="flex" flexDirection="column" gap={2} height="100%">
                <Box bgcolor="white" flex={1} borderRadius={"10px"}/>
                <Box bgcolor="white" flex={1} borderRadius={"10px"}/>
            </Box>

            {/* Правая колонка */}
            <Box width="40%" bgcolor="white" borderRadius={"10px"}/>
        </Box>
    );
};

export default GenreList;