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
              color: "var(--dark-purple)",
              textTransform: "none",
              minWidth: "120px",
              justifyContent: "flex-start",
              borderRadius: "10px",
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
                backgroundColor: "var(--columbia-blue)",
                padding: 0,
                borderRadius: "12px",
                overflow: "hidden",
              }
            }}
            PaperProps={{
              sx: {
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                minWidth: "120px",
                borderRadius: "12px",
                overflow: "hidden",
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
                    color: "var(--dark-purple)",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      "&:hover": {
                        backgroundColor: "white",
                      }
                    },
                    ...(index === 0 && {
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }),
                    ...(index === options.length - 1 && {
                      borderBottomLeftRadius: "12px",
                      borderBottomRightRadius: "12px",
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