import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const MyPagination: React.FC<CustomPaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        const blockStart = Math.floor((currentPage - 1) / 10) * 10;

        // Рассчитываем предпоследнюю как ближайшее кратное 10 от currentPage
        const nearestMultipleOf10 = Math.min(
            Math.ceil(currentPage / 10) * 10,
            totalPages - 1
        );

        // Добавляем первую страницу
        if (blockStart === 0){
            pages.push(1);
        }
        else{
            pages.push(blockStart);
        }

        // Троеточие после 1, если надо
        if (currentPage > 5) {
            pages.push('...');
        }

        // Добавляем текущую и соседей
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < totalPages) {
                pages.push(i);
            }
        }

        // Предпоследняя кратная 10, если не дублируется
        if (
            nearestMultipleOf10 !== totalPages &&
            !pages.includes(nearestMultipleOf10)
        ) {
            if (
                typeof pages[pages.length - 1] === 'number' &&
                (pages[pages.length - 1] as number) < nearestMultipleOf10 - 1
            ) {
                pages.push('...');
            }
            pages.push(nearestMultipleOf10);
        }

        // Последняя страница
        if (!pages.includes(totalPages)) {
            pages.push(totalPages);
        }

        return pages;
    };

    const handleClick = (page: number | string) => {
        if (typeof page === 'number' && page !== currentPage) {
            onPageChange(page);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <Box display="flex" justifyContent="center" gap={3}>
            <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                sx={{
                    padding: "12px",
                    color: "black",
                    border: "1px solid black",
                    textTransform: "none",
                    borderRadius: "10px",
                    "&:hover": {
                        backgroundColor: "black",
                        color: "white"
                    }
                }}
            >
                <KeyboardArrowLeftIcon sx={{
                    width: "20px",
                    height: "20px"
                }}/>
                <Typography variant={"mainSbL"} >
                    Попередня
                </Typography>
            </Button>

            {getPageNumbers().map((item, index) => (
                typeof item === 'number' ? (
                    <Button
                        key={index}
                        onClick={() => handleClick(item)}
                        sx={{
                            padding: "12px",
                            color: item === currentPage ? "white" : "black",
                            backgroundColor: item === currentPage ? "black" : "transparent",
                            border: "1px solid black",
                            textTransform: "none",
                            minWidth: 'unset',
                            borderRadius: "10px",
                            "&:hover": {
                                backgroundColor: "black",
                                color: "white",
                            },
                        }}
                    >
                        <Typography variant={"mainSbL"} width={"20px"} height={"20px"}>
                            {item}
                        </Typography>
                    </Button>
                ) : (
                    <Typography key={index} width={"20px"} height={"20px"} variant="button" sx={{
                        padding: "12px",
                        textAlign: "center",
                        border: "1px solid black",
                        borderRadius: "10px",
                    }}>
                        {item}
                    </Typography>
                )
            ))}

            <Button
                variant="outlined"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                sx={{
                    padding: "12px",
                    color: "black",
                    border: "1px solid black",
                    textTransform: "none",
                    borderRadius: "10px",
                    "&:hover": {
                        backgroundColor: "black",
                        color: "white"
                    }
                }}
            >
                <Typography variant={"mainSbL"} >
                    Наступна
                </Typography>
                <KeyboardArrowRightIcon/>
            </Button>
        </Box>
    );
};

export default MyPagination;
