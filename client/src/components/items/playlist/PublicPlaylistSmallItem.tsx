import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import { useTranslation } from 'react-i18next';
import {useAppNavigate} from "../../../hooks/useAppNavigate.ts";
import type { PlaylistSimpleDto } from "../../../models/DTO/PlaylistSimpleDto.ts";
import React, {type FC} from "react";
import {usePlayTrack} from "../../../hooks/usePlayTrack.tsx";
import {useAppDispatch} from "../../../hooks/redux.ts";
import {fetchTracksByAlbum} from "../../../store/reducers/action-creators/tracks.ts";
import playlistImage from "../../../assets/sidebar/playlistImage.svg"

interface PlaylistItemProps {
    playlist: PlaylistSimpleDto;
    itemWidth: number;
    color?: "dark" | "light";
}

const PublicPlaylistSmallItem: FC<PlaylistItemProps> = ({playlist, itemWidth, color = "light"}) => {

    const { t } = useTranslation('other')
    const route = useAppNavigate()
    const { playTrackList } = usePlayTrack();
    const dispatch = useAppDispatch();

    const handlePlayPlaylist = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const result = await dispatch(fetchTracksByAlbum({
            albumId: playlist.id,
            page: 0,
            size: 1000
        }));

        if (fetchTracksByAlbum.fulfilled.match(result)) {
            playTrackList(result.payload, 0);
        }
    }

    return (
        <Box
            onClick={() => route(`/playlist/${playlist.id}`)}
            sx={{
                width: itemWidth,
                boxShadow: "none",
                color: 'black',
                flexShrink: 0,
                cursor: "pointer",
                transition: 'background-color 0.3s ease',
            }}
        >
            {/* Контейнер для изображения и кнопки */}
            <Box
                position="relative"
                width={itemWidth}
                height={itemWidth}
                borderRadius={"10px"}
                sx={{
                    overflow: 'hidden',
                }}
            >
                {/* Изображение плейлиста */}
                <Box
                    component="img"
                    width="100%"
                    height="100%"
                    src={playlist.imgUrl || playlistImage}
                    sx={{
                        objectFit: "cover",
                        display: "block",
                    }}
                />

                {/* Кнопка play поверх изображения */}
                <IconButton
                    onClick={(e) => {
                        handlePlayPlaylist(e)
                    }}
                    sx={{
                        padding: 0,
                        position: "absolute",
                        bottom: 16,
                        right: 16
                    }}
                    disableRipple={true}
                >
                    <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                         height={"30px"}/>
                </IconButton>
            </Box>

            <Box display="flex" flexDirection="column" flexGrow={1} mt={1} color={color === "dark" ? "var(--dark-purple)" : "var(--orange-peel)"}>
                <Typography gutterBottom variant="mainSbL" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {playlist.title}
                </Typography>
                <Typography variant="mainRM" sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <Box>
                        {t("title-playlist")}
                    </Box>
                    <Box component="span" sx={{ fontSize: '20px', lineHeight: 1 }}>
                        &middot;
                    </Box>
                    <Box>
                        {playlist.owner?.name || "Unknown"}
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
};

export default PublicPlaylistSmallItem;