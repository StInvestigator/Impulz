import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CirclesCard from './CirclesCard';
import BackdropCircle from './BackdropCircle';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAllGenres } from '../../store/reducers/action-creators/genre';
import { useTranslation } from 'react-i18next';

type Element = {
    id: number;
    title: string;
    titleUa: string;
    imageUrl: string;
    align: 'left' | 'center' | 'right';
    height: number;
    width: number;
    borderRadius: string;
};

// Base layout for up to 15 items (keeps the original look & feel)
const baseLayout: Array<Pick<Element, 'align' | 'height' | 'width' | 'borderRadius'>> = [
    { align: 'left', height: 2, width: 1, borderRadius: "10px" },
    { align: 'right', height: 1, width: 2, borderRadius: "10px 10px 10px 50px" },

    { align: 'center', height: 1, width: 1, borderRadius: "10px" },
    { align: 'right', height: 2, width: 1, borderRadius: "10px" },

    { align: 'left', height: 1, width: 1, borderRadius: "10px" },
    { align: 'center', height: 1, width: 1, borderRadius: "10px" },

    { align: 'left', height: 1, width: 1, borderRadius: "10px 10px 50px 10px" },
    { align: 'center', height: 1, width: 1, borderRadius: "10px" },
    { align: 'right', height: 1, width: 1, borderRadius: "10px 10px 10px 50px" },

    { align: 'left', height: 1, width: 1, borderRadius: "10px" },
    { align: 'center', height: 1, width: 1, borderRadius: "50px 50px 10px 10px" },
    { align: 'right', height: 1, width: 1, borderRadius: "10px" },

    { align: 'left', height: 1, width: 1, borderRadius: "10px" },
    { align: 'center', height: 1, width: 1, borderRadius: "10px" },
    { align: 'right', height: 1, width: 1, borderRadius: "10px" },
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


const LibraryGrid = () => {

    const navigate = useNavigate();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [center, setCenter] = useState<{ x: number; y: number } | null>(null);
    const [elements, setElements] = useState<Element[]>([]);

    const dispatch = useAppDispatch();
    const allGenres = useAppSelector(state => state.genre.allGenres);
    const { i18n } = useTranslation();

    useEffect(() => {
        dispatch(fetchAllGenres());
    }, [dispatch]);

    const isUkrainian = i18n.language?.toLowerCase().startsWith('uk');
    useEffect(() => {
        const mapped: Element[] = allGenres.map((g, idx) => {
            const hasBase = idx < baseLayout.length;
            const layout = hasBase
                ? baseLayout[idx]
                : { align: (idx % 3 === 0 ? 'left' : idx % 3 === 1 ? 'center' : 'right') as 'left' | 'center' | 'right', height: 1, width: 1, borderRadius: "10px" };

            return {
                id: g.id,
                title: g.name,
                titleUa: g.uaName,
                imageUrl: g.imgUrl || '',
                align: layout.align,
                height: layout.height,
                width: layout.width,
                borderRadius: layout.borderRadius,
            };
        });
        setElements(mapped);
    }, [allGenres, i18n.language]);

    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let raf = 0;
        const update = () => {
            const r = el.getBoundingClientRect();
            setCenter({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
        };

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
            <BackdropCircle />
            <GridContainer>
                {elements.map((elem, index) => (
                    <GridItem
                        onClick={() => navigate('/category', { state: { genreId: elem.id, category: elem.title, categoryUa: elem.titleUa } })}
                        key={index}
                        colSpan={elem.width == 1 ? (elem.align == 'center' ? 8 : 6) : elem.width == 2 ? 14 : 20}
                        rowSpan={elem.height}
                    >
                        <CirclesCard image={elem.imageUrl} align={elem.align} borderRadius={elem.borderRadius} center={center}>
                            <Box
                                sx={{
                                    color: 'var(--orange-peel)',
                                    px: '12px',
                                    py: '12px',
                                    mx: '24px',
                                    borderRadius: '10px',
                                    backdropFilter: 'blur(6px)',
                                    backgroundColor: 'rgba(35, 12, 51, 0.6)'
                                }}
                            >
                                {isUkrainian ? elem.titleUa : elem.title}
                            </Box>
                        </CirclesCard>
                    </GridItem>
                ))}
            </GridContainer>
        </Box>
    )
};

export default LibraryGrid;
