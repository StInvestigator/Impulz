import {Box, IconButton, Link, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import {type FC} from "react";
import { useTranslation } from 'react-i18next';
import type { AlbumSimpleDto } from "../../../models/DTO/AlbumSimpleDto";

interface AlbumItemProps {
    album: AlbumSimpleDto;
    itemWidth: number;
    color?: "dark" | "light";
}

const AlbumSmallItem: FC<AlbumItemProps> = ({album, itemWidth, color = "light"}) => {

    const { t } = useTranslation('other')

    return (
        <Box
            sx={{
                width: itemWidth,
                color: 'black',
                flexShrink: 0,
                cursor: "pointer",
            }}
        >
            {/* Контейнер для изображения альбома */}
            <Box
                position="relative"
                width={itemWidth}
                height={itemWidth}
                borderRadius={"10px"}
                sx={{
                    backgroundImage: `url(${album.imgUrl || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: album.imgUrl ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
                }}
            >
                {/* Кнопка play поверх изображения */}
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    sx={{
                        padding: 0,
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        }
                    }}
                >
                    <Box
                        component={"img"}
                        src={playImage}
                        width={"30px"}
                        height={"30px"}
                    />
                </IconButton>
            </Box>

            {/* Информация об альбоме */}
            <Box display="flex" flexDirection="column" mt={1} color={color === "dark" ? "var(--dark-purple)" : "var(--orange-peel)"}>
                <Typography
                    gutterBottom
                    variant="mainSbL"
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {album.title}
                </Typography>
                <Typography
                    variant="mainRM"
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <Box>
                        {t("title-album")}
                    </Box>
                    <Box component="span" sx={{ fontSize: '20px', lineHeight: 1 }}>
                        &middot;
                    </Box>
                    <Link sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        },
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        <Box>
                            {album.authors.map(author => author.name).join(", ") || "Unknown"}
                        </Box>
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default AlbumSmallItem;