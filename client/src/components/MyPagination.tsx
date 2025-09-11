import React from 'react';
import { Pagination, PaginationItem, Typography } from '@mui/material';
import { useAppDispatch } from '../hooks/redux';
import { setCurrentPage } from '../store/reducers/PageSlice';

interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
}

function CustomPrevious() {
    return (
        <Typography variant="mainSbL" sx={{ userSelect: 'none', padding: "12px" }}>
            ← Назад
        </Typography>
    );
}

function CustomNext() {
    return (
        <Typography variant="mainSbL" sx={{ userSelect: 'none', padding: "12px" }}>
            Вперёд →
        </Typography>
    );
}

function CustomFirst() {
    return (
        <Typography variant="mainSbL" sx={{ userSelect: 'none', padding: "12px" }}>
            « В начало
        </Typography>
    );
}

function CustomLast() {
    return (
        <Typography variant="mainSbL" sx={{ userSelect: 'none', padding: "12px" }}>
            В конец »
        </Typography>
    );
}

const MyPagination: React.FC<CustomPaginationProps> = ({ currentPage, totalPages }) => {
    const dispatch = useAppDispatch();
    
    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            showFirstButton
            showLastButton
            onChange={(_, page) => dispatch(setCurrentPage(page))}
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    slots={{
                        previous: CustomPrevious,
                        next: CustomNext,
                        first: CustomFirst,
                        last: CustomLast,
                    }}
                />
            )}
        />
    );
};

export default MyPagination;
