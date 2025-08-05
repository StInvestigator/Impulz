import {Box} from "@mui/material";
import MyPagination from "../components/MyPagination.tsx";
import {useState} from "react";
import TopSelectionsList from "../components/lists/TopSelectionsList.tsx";

const TopSelectionsPage = () => {
    const [page, setPage] = useState(1)

    return (
        <>
            <h2>Топ добірок</h2>
            <Box component={"section"} marginTop={"20px"} >
                <TopSelectionsList/>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination totalPages={30} currentPage={page} onPageChange={setPage}/>
            </Box>
        </>
    );
};

export default TopSelectionsPage;