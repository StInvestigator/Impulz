import {Box, Button, Typography} from "@mui/material";
import TopSelectionsList from "./lists/TopSelectionsList.tsx";
import { useTranslation } from 'react-i18next';

const TopSelections = () => {

    const { t } = useTranslation('main')

    return (
        <Box width={"100%"}>
            <Box display={"flex"} justifyContent={"space-between"} marginBottom={2} px={3}>
                <Typography variant={"h1"} fontSize={"36px"} fontWeight={700}>
                    {t("title-top-selections")}
                </Typography>
                <Button sx={{
                    height: "32px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "black",
                    textTransform: "none"
                }}>
                    {t("button-watch-all")}
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