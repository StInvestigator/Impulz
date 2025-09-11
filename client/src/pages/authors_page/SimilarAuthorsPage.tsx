import {Box} from "@mui/material";
import MyPagination from "../../components/MyPagination.tsx";
import {useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { fetchSimilarAuthorsByGenre } from "../../store/reducers/action-creators/author.ts";
import { useParams } from "react-router-dom";
import AuthorList from "../../components/lists/AuthorList.tsx";



const SimilarAuthorsPage = () => {

    const {currentPage, totalPages} = useAppSelector(state => state.page);
    const {id} = useParams<{ id:string }>();

    const dispatch = useAppDispatch();
    const { similarAuthors } = useAppSelector(state => state.author);

    useEffect(() => {
        if (id){
            dispatch(fetchSimilarAuthorsByGenre({ authorId: id, page: currentPage - 1, size: 20 }));
        }
        console.log(similarAuthors);
    }, [dispatch, currentPage]);

    return (
        <>
            <h2>Схожі виконавці</h2>
            <Box component={"section"} marginTop={"20px"} >
                <AuthorList authors={similarAuthors}/>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination totalPages={totalPages} currentPage={currentPage}/>
            </Box>
        </>
    );
};

export default SimilarAuthorsPage;