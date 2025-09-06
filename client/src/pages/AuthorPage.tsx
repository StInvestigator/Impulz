import {Box} from "@mui/material";
import MyPagination from "../components/MyPagination.tsx";
import {useState} from "react";



const AuthorPage = () => {

    const [page, setPage] = useState(1)

    return (
        <>
            <h2>Найкращі виконавці цього жанру | Схожі виконавці</h2>
            <Box component={"section"} marginTop={"20px"} >
                {/*<AuthorList authors={authors}/>*/}
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination totalPages={30} currentPage={page} onPageChange={setPage}/>
            </Box>
        </>
    );
};

export default AuthorPage;