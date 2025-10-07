import { useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { Box, Button, Typography, Menu, MenuItem } from "@mui/material";
import i18n from "i18next";

type LangOption = {
    code: string;
    label: string;
};

const options: LangOption[] = [
    { code: "uk", label: "Українська" },
    { code: "en", label: "English" },
];

const STORAGE_KEY = "lang";

export default function Dropdown() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCode, setSelectedCode] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) || i18n.language || "uk";
    });

    const open = Boolean(anchorEl);
    const selectedLabel = options.find((opt) => opt.code === selectedCode)?.label || options[0].label;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (code: string) => {
        setSelectedCode(code);
        i18n.changeLanguage(code);
        localStorage.setItem(STORAGE_KEY, code);
        handleClose();
    };

    return (
        <Box>
            <Button
                onClick={handleClick}
                sx={{
                    fontFamily: "Work Sans, sans-serif",
                    cursor: "pointer",
                    backgroundColor: "var(--columbia-blue)",
                    color: "var(--berkeley-blue)",
                    textTransform: "none",
                    minWidth: "120px",
                    justifyContent: "flex-start",
                    padding: "8px 12px",
                    '&:hover': {
                        backgroundColor: "var(--columbia-blue)",
                        opacity: 0.9,
                    },
                }}
            >
                <LanguageIcon
                    sx={{ marginRight: "6px", width: "20px", height: "20px" }}
                />
                <Typography
                    variant={"mainSbL"}
                    textTransform={"none"}
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: 1,
                        textAlign: "left"
                    }}
                >
                    {selectedLabel}
                </Typography>
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'language-button',
                    sx: {
                        padding: 0
                    }
                }}
                PaperProps={{
                    sx: {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        borderRadius: "0px 0px 12px 12px",
                        backgroundColor: "white",
                        border: "1px solid DodgerBlue",
                        borderTop: "none",
                        marginLeft: "-5px",
                        marginTop: "3px"
                    }
                }}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom'
                }}
                transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option.code}
                        onClick={() => handleSelect(option.code)}
                        selected={option.code === selectedCode}
                        sx={{
                            padding: "10px 16px",
                            borderBottom: index < options.length - 1 ? "1px solid DodgerBlue" : "none",
                            color: "var(--berkeley-blue)",
                            backgroundColor: "white",
                            "&:hover": {
                                backgroundColor: "var(--columbia-blue)",
                            },
                            "&.Mui-selected": {
                                backgroundColor: "SkyBlue",
                                "&:hover": {
                                    backgroundColor: "SkyBlue",
                                }
                            },
                            margin: 0,
                            borderRadius: 0,
                            ...(index === options.length - 1 && {
                                borderBottomLeftRadius: "11px",
                                borderBottomRightRadius: "11px",
                            }),
                        }}
                    >
                        <Typography variant={"mainSbL"} textTransform={"none"}>
                            {option.label}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}