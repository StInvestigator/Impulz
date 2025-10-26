import { MenuItem, Typography, ListItemIcon, Box } from "@mui/material";
import React from "react";

interface ContextMenuItemProps {
    icon: string;
    text: string;
    onClick: (e: React.MouseEvent) => void;
    isFirst?: boolean;
    isLast?: boolean;
    onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
                                                                    icon,
                                                                    text,
                                                                    onClick,
                                                                    isFirst = false,
                                                                    isLast = false,
                                                                    onMouseEnter,
                                                                    onMouseLeave,
                                                                }) => {
    return (
        <MenuItem
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            disableRipple
            sx={{
                marginTop: isFirst ? "-8px" : "0px",
                marginBottom: isLast ? "-8px" : "0px",
                borderBottom: isLast ? "none" : "1px solid var(--dodger-blue)",
                padding: "8px 12px",
                borderRadius: isFirst ? "7px 7px 0 0" : isLast ? "0 0 7px 7px" : "0",
                '&.MuiMenuItem-root': {
                    borderRadius: isFirst ? "7px 7px 0 0" : isLast ? "0 0 7px 7px" : "0",
                },
                '&:hover': {
                    backgroundColor: "var(--indigo-dye)",
                    '& .MuiTypography-root': {
                        color: "white",
                    },
                    '& .MuiListItemIcon-root img': {
                        filter: "brightness(0) invert(1)",
                    }
                }
            }}
        >
            <ListItemIcon sx={{ minWidth: "auto", marginRight: "-10px"}}>
                <Box
                    component="img"
                    src={icon}
                    sx={{ width: 14, height: 14 }}
                />
            </ListItemIcon>
            <Typography
                sx={{
                    color: "var(--berkeley-blue)",
                    fontSize: "14px",
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 400,
                }}
            >
                {text}
            </Typography>
        </MenuItem>
    );
};