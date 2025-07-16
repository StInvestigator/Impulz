import React from 'react';
import Grid from '@mui/material/Grid'; // default import for correct types
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import bg1 from "../../images/library/library_bg1.png"

type Element = {
    title: string;
    imageUrl: string;
    align: 'left' | 'center' | 'right' | 'bottom-center';
};

const elements: Element[] = [
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'left' },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'center' },
    { title: 'Рекомендації', imageUrl: bg1, align: 'right' },

    { title: 'Рекомендації', imageUrl: bg1, align: 'left' },
    { title: 'Поп', imageUrl: bg1, align: 'bottom-center' },
    { title: 'Інструментальна музика', imageUrl: bg1, align: 'right' },
    // ... другие блоки
];

interface BlockProps {
    image: string;
    align: Element['align'];
}

const Block = styled(Box)<BlockProps>(({ theme, image, align }) => ({
    position: 'relative',
    width: '100%',
    height: 200,
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent:
        align === 'left'
            ? 'flex-start'
            : align === 'center' || align === 'bottom-center'
                ? 'center'
                : 'flex-end',
    alignItems: align === 'bottom-center' ? 'flex-end' : 'flex-start',
    padding: theme.spacing(1),
    boxSizing: 'border-box',
    fontSize: '1.2rem',
    fontWeight: 700,
    paddingBlock: 0,
    paddingInline: 0
}));


const InfoGrid: React.FC = () => (
    <Grid container spacing={3}>
        {elements.map((elem) => (
            <Grid
                size={{ xs: 12, md: elem.align === 'center' || elem.align === 'bottom-center' ? 4.8 : 3.6 }}>
                <Block image={elem.imageUrl} align={elem.align}>
                    <Box sx={{ backgroundColor: '#FFF', padding: '24px', borderRadius: elem.align === 'left'
            ? '10px 50px 50px 10px'
            : elem.align === 'center' || elem.align === 'bottom-center'
                ? '50px'
                : '50px 10px 10px 50px'}}>
                        <div color='black'>
                            {elem.title}
                        </div>
                    </Box>
                </Block>
            </Grid>
        ))}
    </Grid>
);

export default InfoGrid;