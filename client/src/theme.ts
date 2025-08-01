import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        h1: {
            fontFamily: '"Manrope", sans-serif',
            fontWeight: 700,
            fontSize: "64px"
        },
        h2: {
            fontFamily: '"Manrope", sans-serif',
            fontWeight: 700,
            fontSize: "36px"
        },
        h3: {
            fontFamily: '"Manrope", sans-serif',
            fontWeight: 700,
            fontSize: "24px"
        },
        h4: {
            fontFamily: '"Manrope", sans-serif',
            fontWeight: 700,
            fontSize: "20px"
        },
        mainSbL: {
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
        },
        mainRL: {
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
        },
        mainSbM: {
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
        },
        mainRM: {
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
        },
        mainSbS: {
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '12px',
            fontWeight: 600,
        },
        mainRS: {
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '12px',
            fontWeight: 400,
        },
        mainRXS: {
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '10px',
            fontWeight: 400,
        },
        allVariants: {
            fontFamily: 'Work Sans, sans-serif',
            lineHeight: 1.2,
            userSelect: "none"
        },
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: 'white',
                },
            },
        },
    }
});