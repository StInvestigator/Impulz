import {Box} from "@mui/material";
import MyPagination from "../components/MyPagination.tsx";
import {useAppSelector} from "../hooks/redux.ts";



const AuthorPage = () => {
    const { currentPage } = useAppSelector(state => state.page);

    return (
        <>
            <h2>Найкращі виконавці цього жанру | Схожі виконавці</h2>
            <Box component={"section"} marginTop={"20px"} >
                {/*<AuthorList authors={authors}/>*/}
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination totalPages={30} currentPage={currentPage}/>
            </Box>
        </>
    );
};

export default AuthorPage;