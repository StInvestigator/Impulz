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
            color: "var(--dark-purple)",
            userSelect: "none"
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true,  // Отключаем эффект клика по умолчанию
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: 'white',
                },
            },
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    display: "flex",
                    justifyContent: "center"
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper:{
                    border: "1px solid #0090FF",
                },
                list:{
                    padding: 0,
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root:{
                    border: "1px solid #0090FF",
                    padding: "12px"
                }
            }
        },
        MuiPaginationItem: {
            styleOverrides: {
                ellipsis: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    minWidth: 44,
                    height: 44,
                    fontSize: '16px',
                    '&:hover': {
                        backgroundColor: 'white',
                        color: "black"
                    },
                },
                root: {
                    minWidth: "44px",
                    height: "44px",
                    color: 'black',
                    border: "1px solid black",
                    borderRadius: "10px",
                    fontFamily: '"Work Sans", sans-serif',
                    fontSize: "16px",
                    fontWeight: 600,
                    userSelect: 'none',
                    textTransform: "none",
                    lineHeight: 1.5,
                    '&.Mui-selected': {
                        backgroundColor: 'black',
                        color: '#fff',
                    },
                    // например, при наведении
                    '&:hover': {
                        backgroundColor: 'black',
                        color: '#fff',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#FFFFFF", // цвет бордера в обычном состоянии
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#FFFFFF", // цвет бордера при наведении
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#FFFFFF", // цвет бордера при фокусе
                    },
                    "& .MuiOutlinedInput-input": {
                        padding: "0px 60px 0px 24px" // внутренние отступы для текста
                    }
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    padding: '12px 16px',
                },
            },
        },
    }
});