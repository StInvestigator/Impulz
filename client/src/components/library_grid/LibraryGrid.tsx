import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import bg1 from "../../images/library/library_bg1.png";

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

    { title: 'Для вас', imageUrl: bg1, align: 'left', height: 1, width: 1, borderRadius: "10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'center', height: 1, width: 1, borderRadius: "10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'right', height: 1, width: 1, borderRadius: "10px" },

    { title: 'Для вас', imageUrl: bg1, align: 'left', height: 1, width: 1, borderRadius: "10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'center', height: 1, width: 1, borderRadius: "10px" },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'right', height: 1, width: 1, borderRadius: "10px" },
];

interface BlockProps {
    image: string;
    align: Element['align'];
}

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

const Block = styled(Box)<BlockProps>(({ theme, image, align }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent:
        align === 'left'
            ? 'flex-start'
            : align === 'center'
                ? 'center'
                : 'flex-end',
    alignItems: 'flex-start',
    padding: theme.spacing(1),
    boxSizing: 'border-box',
    fontSize: '24px',
    fontWeight: 700,
    cursor: 'pointer',
    placeItems: 'center',
    paddingBlock: 0,
    paddingInline: 0,
    color: 'Black'
}));

const LibraryGrid: React.FC = () => (
    <GridContainer>
        {elements.map((elem, index) => (
            <GridItem
                key={index}
                colSpan={elem.width == 1 ? (elem.align == 'center' ? 8 : 6) : elem.width == 2 ? 14 : 20}
                rowSpan={elem.height}
            >
                <Block image={elem.imageUrl} align={elem.align} borderRadius={elem.borderRadius}>
                    <Box sx={{ backgroundColor: '#FFF', padding: '12px', borderRadius: '10px' }}>
                        {elem.title}
                    </Box>
                </Block>
            </GridItem>
        ))}
    </GridContainer>
);

export default LibraryGrid;
