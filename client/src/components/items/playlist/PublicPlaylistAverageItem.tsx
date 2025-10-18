import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import { useTranslation } from 'react-i18next';
import React, { type FC } from "react";
import { usePlayTrack } from "../../../hooks/usePlayTrack.tsx";
import { useAppDispatch } from "../../../hooks/redux.ts";
import { fetchTracksByPlaylist } from "../../../store/reducers/action-creators/tracks.ts";
import type { PlaylistSimpleDto } from "../../../models/DTO/PlaylistSimpleDto";
import {useAppNavigate} from "../../../hooks/useAppNavigate.ts";

interface PlaylistItemProps {
    playlist: PlaylistSimpleDto;
    itemHeight: number;
}

const PublicPlaylistAverageItem: FC<PlaylistItemProps> = ({ playlist, itemHeight }) => {

    const { t } = useTranslation('other')
    const { playTrackList } = usePlayTrack();
    const dispatch = useAppDispatch();
    const route = useAppNavigate()

    const handlePlayPlaylist = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const result = await dispatch(fetchTracksByPlaylist({
            playlistId: playlist.id,
            page: 0,
            size: 1000
        }));

        if (fetchTracksByPlaylist.fulfilled.match(result)) {
            playTrackList(result.payload, 0);
        }
    }

    return (
        <Box
            onClick={() => route(`/playlist/${playlist.id}`)}
            sx={{
                cursor: "pointer",
                width: "100%",
            }}
        >
            <Box bgcolor="gray" width="100%" height={`${itemHeight - 88}px`} borderRadius={"10px 10px 0 0"} position={"relative"} sx={{
                backgroundImage: `url(${playlist.imgUrl || ""})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

            </Box>
            <Box display={"flex"} padding={"24px"} height={"88px"} boxSizing={"border-box"} borderRadius={"0 0 10px 10px"} sx={{
                background: "var(--gradient-plashka-purple)",
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" width={"100%"}>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant={"mainSbL"} gutterBottom color={"var(--orange-peel)"}>
                            {playlist.title}
                        </Typography>
                        <Typography variant={"mainRM"} color={"var(--columbia-blue)"}>
                            {t("title-playlist")} &middot; {playlist.owner.name || "Unknown creator"}
                        </Typography>
                    </Box>

                    <IconButton
                        onClick={(e) => {
                            handlePlayPlaylist(e)
                        }}
                        sx={{ padding: 0 }}
                        disableRipple={true}
                    >
                        <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                            height={"30px"} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default PublicPlaylistAverageItem;