import React, { useState, useRef, useEffect } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import {Box, Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {ILanguagePage} from "../model/ILanguagePage";

const languages: ILanguagePage[] = [
    { code: "uk", label: "Українська" },
    { code: "en", label: "English" },
];

export default function Dropdown() {
    const [open, setOpen] = useState(false);
    const [selectedCode, setSelectedCode] = useState(() => {
        return localStorage.getItem("lang") || languages[0].code;
    });
    const { i18n } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);

    const [selectedLabel, setSelectedLabel] = useState("")

    // Закрытие при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {

        setSelectedLabel(languages.find(lang => lang.code === selectedCode)?.label || languages[0].label)
    }, [selectedCode]);

    const openClick = () => setOpen((prev) => !prev);

    const handleSelect = (option: ILanguagePage) => {
        setSelectedCode(option.code);
        setOpen(false);
        i18n.changeLanguage(option.code);
        localStorage.setItem("lang", option.code);
    };

    return (
        <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
            <Button onClick={openClick} sx={{
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "none",
            }}>
                <LanguageIcon sx={{marginRight: "6px", width: "20px", height: "20px"}}/>
                {selectedLabel}
            </Button>

            {open && (
                <Box
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        marginTop: "4px",
                        border: "1px solid black",
                        backgroundColor: "black",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        zIndex: 10,
                    }}
                >
                    {languages.map((language) => (
                        <Box
                            key={language.code}
                            onClick={() => handleSelect(language)}
                            style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "white"
                                e.currentTarget.style.color = "black"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "black"
                                e.currentTarget.style.color = "white"
                            }}
                        >
                            {language.label}
                        </Box>
                    ))}
                </Box>
            )}
        </div>
    );
}
