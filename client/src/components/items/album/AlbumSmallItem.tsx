import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import React, { type FC } from "react";
import { useTranslation } from 'react-i18next';
import type { AlbumSimpleDto } from "../../../models/DTO/album/AlbumSimpleDto.ts";
import { usePlayTrack } from "../../../hooks/usePlayTrack.tsx";
import { useAppDispatch } from "../../../hooks/redux.ts";
import { fetchTracksByAlbum } from "../../../store/reducers/action-creators/tracks.ts";
import { useAppNavigate } from "../../../hooks/useAppNavigate.ts";

interface AlbumItemProps {
    album: AlbumSimpleDto;
    itemWidth: number;
    color?: "dark" | "light";
}

const AlbumSmallItem: FC<AlbumItemProps> = ({ album, itemWidth, color = "light" }) => {

    const { t } = useTranslation('other')
    const { playTrackList } = usePlayTrack();
    const dispatch = useAppDispatch();
    const route = useAppNavigate();


    const handlePlayPlaylist = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const result = await dispatch(fetchTracksByAlbum({
            albumId: album.id,
            page: 0,
            size: 1000
        }));

        if (fetchTracksByAlbum.fulfilled.match(result)) {
            playTrackList(result.payload, 0);
        }
    }

    return (
        <Box
            onClick={() => route(`/album/${album.id}`)}
            sx={{
                width: itemWidth,
                color: 'black',
                flexShrink: 0,
                cursor: "pointer",
                padding: "4px",
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
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
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                }}
            >
                {/* Кнопка play поверх изображения */}
                <IconButton
                    onClick={(e) => {
                        handlePlayPlaylist(e)
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
                    disableRipple={true}
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
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {album.authors.map((author, index) => (
                            <Box key={author.id} sx={{
                                display: 'flex', alignItems: 'center', color: 'inherit',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }
                            }}
                                onClick={() => route(`/author/${author.id}`)}>
                                {author.name}
                                {index < album.authors.length - 1 && (
                                    <Box component="span" sx={{ mx: '4px' }}>,</Box>
                                )}
                            </Box>
                        ))}
                        {album.authors.length === 0 && "Unknown"}
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
};

export default AlbumSmallItem;