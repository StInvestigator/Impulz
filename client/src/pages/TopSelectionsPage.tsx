import {Box} from "@mui/material";
import MyPagination from "../components/MyPagination.tsx";
import TopSelectionsList from "../components/lists/TopSelectionsList.tsx";
import {useAppSelector} from "../hooks/redux.ts";

const TopSelectionsPage = () => {
    const { currentPage } = useAppSelector(state => state.page);

    return (
        <>
            <h2>Топ добірок</h2>
            <Box component={"section"} marginTop={"20px"} >
                <TopSelectionsList/>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination totalPages={30} currentPage={currentPage}/>
            </Box>
        </>
    );
};

export default TopSelectionsPage;