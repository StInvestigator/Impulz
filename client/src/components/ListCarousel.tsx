import {Box, Button, IconButton, Typography, type TypographyProps} from '@mui/material';
import arrowLeftImg from "../assets/arrow/arrowLeft.svg"
import arrowRightImg from "../assets/arrow/arrowRight.svg"
import {type ReactNode, type FC, useRef, useState, useEffect, Children} from "react";
import { useTranslation } from 'react-i18next';


interface ListCarouselProps {
    title: string;
    variant: TypographyProps['variant'];
    bgColor?: string;
    textColor?: string;
    gap: number;
    count_items: number;
    children: ReactNode;
}

const ListCarousel: FC<ListCarouselProps> = ({title, variant, bgColor, textColor, gap ,count_items, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const firstItemRef = useRef<HTMLDivElement>(null);

    const [offset, setOffset] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [itemWidth, setItemWidth] = useState(0); // динамически вычисляется
    const { t } = useTranslation('other')

    // Измеряем ширину контейнера и одного элемента
    useEffect(() => {
        const updateSizes = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
            if (firstItemRef.current) {
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
                backgroundColor: bgColor || 'var(--dark-purple)',
                boxSizing: 'border-box',
                width: '100%',
                overflowX: 'hidden',
                padding: "24px"
            }}
        >
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant={variant} color={textColor || 'var(--deep-sky-blue)'}>
                    {title}
                </Typography>
                <Button sx={{
                    border: `1px solid ${textColor || 'var(--deep-sky-blue)'}`, 
                    borderRadius: "10px", // Скругление углов
                    color: textColor || 'var(--deep-sky-blue)', // Цвет текста
                    textTransform: "none", // Без изменения регистра текста
                    padding: "8px 12px",
                }}>
                    <Typography variant={"mainSbS"}>
                        {t("button-watch-all")}
                    </Typography>
                </Button>
            </Box>

            {/* Кнопка Влево */}
            <IconButton
                onClick={() => handleScroll('left')}
                disabled={offset === 0}
                sx={{
                    display: offset === 0 ? "none" : "block",
                    position: 'absolute',
                    top: '50%',
                    left: 10,
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0)' }
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
                        gap: `${gap}px`
                    }}
                >
                    {Children.map(children, (child, index) => (
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
                    display: offset >= maxOffset  ? "none" : "block",
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
