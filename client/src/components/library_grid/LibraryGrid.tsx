import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CirclesCard from './CirclesCard';
import BackdropCircle from './BackdropCircle';

import bg1 from "../../assets/library/library_bg1.png";

// Диаметры заданы в компонентах через constants.ts

type Element = {
    title: string;
    imageUrl: string;
    align: 'left' | 'center' | 'right';
    height: number;
    width: number;
    borderRadius: string;
};

const elements: Element[] = [
    { title: 'Для вас', imageUrl: bg1, align: 'left', height: 2, width: 1, borderRadius: "10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'right', height: 1, width: 2, borderRadius: "10px 10px 10px 50px" },

    { title: 'Інструментальна музика', imageUrl: bg1, align: 'center', height: 1, width: 1, borderRadius: "10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'right', height: 2, width: 1, borderRadius: "10px" },

    { title: 'Для вас', imageUrl: bg1, align: 'left', height: 1, width: 1, borderRadius: "10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'center', height: 1, width: 1, borderRadius: "10px" },

    { title: 'Для вас', imageUrl: bg1, align: 'left', height: 1, width: 1, borderRadius: "10px 10px 50px 10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'center', height: 1, width: 1, borderRadius: "10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'right', height: 1, width: 1, borderRadius: "10px 10px 10px 50px" },

    { title: 'Для вас', imageUrl: bg1, align: 'left', height: 1, width: 1, borderRadius: "10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'center', height: 1, width: 1, borderRadius: "50px 50px 10px 10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'right', height: 1, width: 1, borderRadius: "10px" },

    { title: 'Для вас', imageUrl: bg1, align: 'left', height: 1, width: 1, borderRadius: "10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'center', height: 1, width: 1, borderRadius: "10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'right', height: 1, width: 1, borderRadius: "10px" },
];

const GridContainer = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(20, 1fr)',
    gap: theme.spacing(3),
}));

const GridItem = styled('div')<{
    colSpan: number;
    rowSpan: number;
}>(({ colSpan, rowSpan }) => ({
    gridColumn: `span ${colSpan}`,
    gridRow: `span ${rowSpan}`,
    height: `calc(${rowSpan} * 200px + ${(rowSpan - 1) * 24}px)`,
}));

// Карточка и фон вынесены в отдельные компоненты


const LibraryGrid = () => {

    const navigate = useNavigate();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [center, setCenter] = useState<{ x: number; y: number } | null>(null);

    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let raf = 0;
        const update = () => {
            const r = el.getBoundingClientRect();
            setCenter({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
        };

        // run once after layout settles (helps during HMR)
        raf = requestAnimationFrame(update);

        const ro = new ResizeObserver(() => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        });
        ro.observe(el);

        window.addEventListener('resize', update);
        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            window.removeEventListener('resize', update);
        };
    }, []);

    return (
        <Box ref={containerRef} position={"relative"} width={"100%"}>
            {/* Полупрозрачный центральный бэкграунд */}
            <BackdropCircle />
            <GridContainer>
                {elements.map((elem, index) => (
                    <GridItem
                        onClick={()=>navigate('/category?category='+elem.title)}
                        key={index}
                        colSpan={elem.width == 1 ? (elem.align == 'center' ? 8 : 6) : elem.width == 2 ? 14 : 20}
                        rowSpan={elem.height}
                    >
                        <CirclesCard image={elem.imageUrl} align={elem.align} borderRadius={elem.borderRadius} center={center}>
                            <Box
                                sx={{ color: 'var(--orange-peel)', padding: '12px', borderRadius: '10px' }}
                            >
                                {elem.title}
                            </Box>
                        </CirclesCard>
                    </GridItem>
                ))}
            </GridContainer>
        </Box>
    )
};

export default LibraryGrid;
