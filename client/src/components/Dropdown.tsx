import {useState, useRef, useEffect} from "react";
import LanguageIcon from "@mui/icons-material/Language";
import {Box, Button, Typography} from "@mui/material";
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
    const [open, setOpen] = useState(false);
    const [selectedCode, setSelectedCode] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) || i18n.language || "uk";
    });

    const ref = useRef<HTMLDivElement>(null);

    const selectedLabel =
        options.find((opt) => opt.code === selectedCode)?.label || options[0].label;

    const handleSelect = (code: string) => {
        setSelectedCode(code);
        i18n.changeLanguage(code);
        localStorage.setItem(STORAGE_KEY, code);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <Box ref={ref} sx={{ position: "relative", display: "inline-block" }}>
            <Button onClick={() => setOpen(!open)} sx={{
                fontFamily: 'Work Sans, sans-serif',
                cursor: "pointer",
                backgroundColor: "black",
                color: "white",
                textTransform: "none"
            }}>
                <LanguageIcon sx={{marginRight: "6px", width: "20px", height: "20px"}}/>
                <Typography variant={"mainSbL"} textTransform={"none"}>
                    {selectedLabel}
                </Typography>
            </Button>

            {open && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        marginTop: "4px",
                        backgroundColor: "white",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        zIndex: 10,
                    }}
                >
                    {options.map((option) => (
                        <Box
                            key={option.code}
                            onClick={() => handleSelect(option.code)}
                            sx={{
                                padding: "8px 12px",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                backgroundColor: "black",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "white",
                                    color: "black",
                                },
                            }}
                        >
                            {option.label}
                        </Box>

                    ))}
                </Box>
            )}
        </Box>
    );
}
