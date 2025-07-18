import React, { ReactNode, useRef, useState, useEffect } from 'react';
import {Box, Button, IconButton, Typography} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import arrowLeftImg from "../images/arrow/arrowLeft.png"
import arrowRightImg from "../images/arrow/arrowRight.png"
import playImage from "../images/play.svg";


interface ListCarouselProps {
    title: string;
    font_size_title: number;
    count_items: number;
    children: ReactNode;
}

const ListCarousel: React.FC<ListCarouselProps> = ({title,font_size_title ,count_items, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const firstItemRef = useRef<HTMLDivElement>(null);

    const [offset, setOffset] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [itemWidth, setItemWidth] = useState(0); // динамически вычисляется

    // Измеряем ширину контейнера и одного элемента
    useEffect(() => {
        const updateSizes = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
            if (firstItemRef.current) {
                const gap = 16; // если gap: 2 в MUI (2 * 8px)
                setItemWidth(firstItemRef.current.offsetWidth + gap);
            }
        };

        updateSizes();
        window.addEventListener('resize', updateSizes);
        return () => window.removeEventListener('resize', updateSizes);
    }, []);

    const totalWidth = count_items * itemWidth;
    const maxOffset = Math.max(totalWidth - containerWidth, 0);

    const handleScroll = (direction: 'left' | 'right') => {
        setOffset((prev) => {
            if (direction === 'left') {
                return Math.max(prev - itemWidth, 0);
            } else {
                return Math.min(prev + itemWidth, maxOffset);
            }
        });
    };

    return (
        <Box
            position="relative"
            borderRadius={"10px"}
            sx={{
                backgroundColor: '#ABA5A5',
                boxSizing: 'border-box',
                width: '100%',
                overflowX: 'hidden',
                padding: "24px"
            }}
        >
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h1" fontSize={font_size_title} fontFamily={"Manrope, sans-serif"} fontWeight={700}>
                    {title}
                </Typography>
                <Button sx={{
                    height: "32px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "black"
                }}>
                    Дивитись всі
                </Button>
            </Box>

            {/* Кнопка Влево */}
            <IconButton
                onClick={() => handleScroll('left')}
                disabled={offset === 0}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 10,
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                }}
            >
                <Box component={"img"} src={arrowLeftImg} width={"30px"} height={"30px"}/>
            </IconButton>

            {/* Контейнер прокрутки */}
            <Box ref={containerRef} sx={{ overflow: 'hidden', width: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        transition: 'transform 0.5s ease',
                        transform: `translateX(-${offset}px)`,
                        gap: 3
                    }}
                >
                    {React.Children.map(children, (child, index) => (
                        <Box ref={index === 0 ? firstItemRef : null}>
                            {child}
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Кнопка Вправо */}
            <IconButton
                onClick={() => handleScroll('right')}
                disabled={offset >= maxOffset}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 10,
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                }}
            >
                <Box component={"img"} src={arrowRightImg} width={"30px"} height={"30px"}/>
            </IconButton>
        </Box>
    );
};

export default ListCarousel;
