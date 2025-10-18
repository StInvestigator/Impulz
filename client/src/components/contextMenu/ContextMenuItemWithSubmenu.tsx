import { MenuItem, Typography, ListItemIcon, Box, Menu } from "@mui/material";
import React, { useState, useRef } from "react";

interface ContextMenuItemWithSubmenuProps {
    icon: string;
    text: string;
    isFirst?: boolean;
    isLast?: boolean;
    submenuItems: Array<{
        icon: string;
        text: string;
        onClick: () => void;
        isFirst?: boolean;
        isLast?: boolean;
    }>;
}

export const ContextMenuItemWithSubmenu: React.FC<ContextMenuItemWithSubmenuProps> = ({
                                                                                          icon,
                                                                                          text,
                                                                                          isFirst = false,
                                                                                          isLast = false,
                                                                                          submenuItems,
                                                                                      }) => {
    const [submenuAnchor, setSubmenuAnchor] = useState<null | HTMLElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const menuRef = useRef<HTMLLIElement>(null);
    const subMenuRef = useRef<HTMLDivElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setSubmenuAnchor(event.currentTarget);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = (event: React.MouseEvent) => {
        const relatedTarget = event.relatedTarget as Node;
        const isLeavingToSubMenu = subMenuRef.current?.contains(relatedTarget);

        if (!isLeavingToSubMenu) {
            setIsHovered(false);
        }
    };

    const handleSubMenuMouseLeave = (event: React.MouseEvent) => {
        const relatedTarget = event.relatedTarget as Node;
        const isLeavingToMainMenu = menuRef.current?.contains(relatedTarget);

        if (!isLeavingToMainMenu) {
            setSubmenuAnchor(null);
            setIsHovered(false);
        }
    };

    const handleSubMenuItemClick = (onClick: () => void) => {
        onClick();
        setSubmenuAnchor(null);
        setIsHovered(false);
    };

    const handleClose = () => {
        setSubmenuAnchor(null);
        setIsHovered(false);
    };

    return (
        <>
            <MenuItem
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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
                    backgroundColor: (isHovered || Boolean(submenuAnchor)) ? "var(--indigo-dye) !important" : "transparent",
                    '&:hover': {
                        backgroundColor: "var(--indigo-dye)",
                    },
                    ...((isHovered || Boolean(submenuAnchor)) && {
                        '& .MuiTypography-root': {
                            color: "white",
                        },
                        '& .MuiListItemIcon-root img': {
                            filter: "brightness(0) invert(1)",
                        }
                    })
                }}
                ref={menuRef}
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
                        color: (isHovered || Boolean(submenuAnchor)) ? "white" : "var(--berkeley-blue)",
                        fontSize: "14px",
                        fontFamily: "'Work Sans', sans-serif",
                        fontWeight: 400,
                    }}
                >
                    {text}
                </Typography>
            </MenuItem>

            <Menu
                open={Boolean(submenuAnchor)}
                anchorEl={submenuAnchor}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        marginLeft: '8px !important',
                    }
                }}
                PaperProps={{
                    sx: {
                        border: "1px solid var(--dodger-blue)",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        minWidth: "180px",
                        maxHeight: "150px",
                        overflow: "auto",
                        boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'var(--dodger-blue)',
                            borderRadius: '3px',
                        },
                    },
                    ref: subMenuRef
                }}
                onMouseLeave={handleSubMenuMouseLeave}
            >
                {submenuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleSubMenuItemClick(item.onClick)}
                        disableRipple
                        sx={{
                            marginTop: item.isFirst ? "-8px" : "0px",
                            marginBottom: item.isLast ? "-8px" : "0px",
                            borderBottom: item.isLast ? "none" : "1px solid var(--dodger-blue)",
                            padding: "8px 12px",
                            borderRadius: item.isFirst ? "7px 7px 0 0" : item.isLast ? "0 0 7px 7px" : "0",
                            '&.MuiMenuItem-root': {
                                borderRadius: item.isFirst ? "7px 7px 0 0" : item.isLast ? "0 0 7px 7px" : "0",
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
                                src={item.icon}
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
                            {item.text}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};