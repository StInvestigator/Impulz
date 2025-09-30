import React from 'react';
import { Pagination, PaginationItem, Typography } from '@mui/material';
import { useAppDispatch } from '../hooks/redux';
import { setCurrentPage } from '../store/reducers/PageSlice';
import { useTranslation } from "react-i18next";

interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
}

function CustomPrevious() {
    const { t } = useTranslation(["other"]);
    return (
        <Typography variant="mainSbL" sx={{ userSelect: 'none', padding: "12px" }}>
            ← {t("other:pagination-previous")}
        </Typography>
    );
}

function CustomNext() {
    const { t } = useTranslation(["other"]);
    return (
        <Typography variant="mainSbL" sx={{ userSelect: 'none', padding: "12px" }}>
            {t("other:pagination-next")} →
        </Typography>
    );
}

function CustomFirst() {
    const { t } = useTranslation(["other"]);
    return (
        <Typography variant="mainSbL" sx={{ userSelect: 'none', padding: "12px" }}>
            « {t("other:pagination-start")}
        </Typography>
    );
}

function CustomLast() {
    const { t } = useTranslation(["other"]);
    return (
        <Typography variant="mainSbL" sx={{ userSelect: 'none', padding: "12px" }}>
            {t("other:pagination-end")} »
        </Typography>
    );
}

const MyPagination: React.FC<CustomPaginationProps> = ({ currentPage, totalPages }) => {
    const dispatch = useAppDispatch();

    const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
    const safeTotalPages = Math.max(1, totalPages);

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        if (page >= 1 && page <= safeTotalPages) {
            dispatch(setCurrentPage(page));
        }
    };

    return (
        <Pagination
            count={safeTotalPages}
            page={safeCurrentPage}
            showFirstButton
            showLastButton
            onChange={handlePageChange}
            // Это работает но mui считает это ошибкой :/ (disableRipple)
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component="div"
                    slots={{
                        previous: CustomPrevious,
                        next: CustomNext,
                        first: CustomFirst,
                        last: CustomLast,
                    }}
                    disabled={item.type === 'previous' && safeCurrentPage === 1 ||
                        item.type === 'next' && safeCurrentPage === safeTotalPages ||
                        item.type === 'first' && safeCurrentPage === 1 ||
                        item.type === 'last' && safeCurrentPage === safeTotalPages}
                    sx={{
                        transition: 'all 0.2s ease',
                        minWidth: '36px',
                        height: '36px',
                        '&:hover': {
                            minWidth: '45px',
                            height: '45px',
                            backgroundColor: 'var(--berkeley-blue)',
                            color: 'white',
                        },
                        '&.Mui-selected': {
                            minWidth: '50px',
                            height: '50px',
                            backgroundColor: 'var(--berkeley-blue)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'var(--berkeley-blue)',
                                minWidth: '50px',
                                height: '50px',
                            }
                        }
                    }}
                />
            )}
            sx={{
                '& .MuiPaginationItem-root': {
                    color: 'var(--dark-purple)',
                    '&.Mui-disabled': {
                        opacity: 0.5,
                    }
                }
            }}
        />
    );
};

export default MyPagination;