import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { AuthorSimpleDto } from "../../../models/DTO/AuthorSimpleDto";
import { usePlayTrack } from "../../../hooks/usePlayTrack.tsx";
import React, {type FC} from "react";

interface AuthorItemProps {
    author: AuthorSimpleDto;
    itemWidth: number;
    color?: "dark" | "light";
}

const AuthorSmallItem: FC<AuthorItemProps> = ({ author, itemWidth, color = "light" }) => {
    const navigate = useNavigate();
    const { t } = useTranslation('other');
    const { playAuthorPopularTracks } = usePlayTrack();

    const handlePlayClick = async (event: React.MouseEvent) => {
        event.stopPropagation();

        try {
            await playAuthorPopularTracks(
                author.id,
                author.name,
                3
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleCardClick = () => {
        navigate(`/author/${author.id}`);
    };


    return (
        <Box
            onClick={handleCardClick}
            sx={{
                width: itemWidth,
                boxShadow: "none",
                color: 'black',
                flexShrink: 0,
                padding: "4px",
                cursor: "pointer",
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
            }}
        >
            <Box
                position="relative"
                width={itemWidth}
                height={itemWidth}
                borderRadius={"50%"}
                sx={{
                    backgroundImage: `url(${author.imgUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "white",
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                }}
            >
                <IconButton
                    onClick={(e) => handlePlayClick(e)}
                    sx={{
                        padding: 0,
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        '&:hover': {
                            transform: 'scale(1.1)',
                        }
                    }}
                    disableRipple
                >
                    <Box
                        component="img"
                        src={playImage}
                        borderRadius="50%"
                        width="30px"
                        height="30px"
                        sx={{ transition: 'transform 0.2s' }}
                    />
                </IconButton>
            </Box>

            <Box display="flex" flexDirection="column" flexGrow={1} textAlign="center" mt={1}
                 color={color === "dark" ? "var(--dark-purple)" : "var(--orange-peel)"}>
                <Typography gutterBottom variant="mainSbL" noWrap>
                    {author.name}
                </Typography>
                <Typography variant="mainRM">{t("title-author")}</Typography>
            </Box>
        </Box>
    );
};

export default AuthorSmallItem;