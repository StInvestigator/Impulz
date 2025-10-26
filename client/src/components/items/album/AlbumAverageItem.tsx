import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import {type FC, useEffect, useState} from "react";
import type { AlbumSimpleDto } from "../../../models/DTO/album/AlbumSimpleDto";
import { useAppNavigate } from "../../../hooks/useAppNavigate.ts";
import { useAppDispatch } from "../../../hooks/redux.ts";
import { fetchAlbumDetails } from "../../../store/reducers/action-creators/album.ts";
import {usePlayTrack} from "../../../hooks/usePlayTrack.tsx";
import {fetchTracksByAlbum} from "../../../store/reducers/action-creators/tracks.ts";
import {AlbumContextMenu} from "../../contextMenu/AlbumContextMenu.tsx";
import {useMediaContextMenu} from "../../../hooks/useMediaContextMenu.ts";

interface AlbumItemProps {
    album: AlbumSimpleDto;
    itemHeight: number;
    itemWidth: number;
}

const AlbumAverageItem: FC<AlbumItemProps> = ({album, itemHeight, itemWidth}) => {
    const navigate = useAppNavigate();
    const { playTrackList } = usePlayTrack();
    const dispatch = useAppDispatch();
    const { contextMenu, handleContextMenu, handleCloseContextMenu } = useMediaContextMenu();
    const [wasContextMenuOpen, setWasContextMenuOpen] = useState(false);

    useEffect(() => {
        if (contextMenu) {
            setWasContextMenuOpen(true);
        }
    }, [contextMenu]);

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

    const handleAlbumClick = () => {
        if (wasContextMenuOpen) {
            setWasContextMenuOpen(false);
            return;
        }

        dispatch(fetchAlbumDetails(album.id));
        navigate(`/album/${album.id}`);
    };

    return (
        <Box
            sx={{
                position: "relative",
                width: itemWidth || "100%",
                height: `${itemHeight}px`,
                display: "flex",
                flexDirection: "column",
                transition: 'height 0.2s ease-in-out',
                cursor: 'pointer',
            }}
            onContextMenu={(e) => handleContextMenu(e, album.id)}
            onClick={handleAlbumClick}
        >
            <Box
                bgcolor="gray"
                width="100%"
                height={`${itemHeight}px`}
                maxWidth={itemWidth}
                borderRadius={"10px"}
                position={"relative"}
                sx={{
                    backgroundImage: `url(${album.imgUrl || ""})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </Box>
            <Box
                display={"flex"}
                padding={"24px"}
                position={"absolute"}
                bottom={0}
                height={"88px"}
                width={"100%"}
                maxWidth={itemWidth}
                boxSizing={"border-box"}
                borderRadius={"0 0 10px 10px"}
                sx={{
                    background: "var(--gradient-plashka-purple)",
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" width={"100%"}>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant={"mainSbL"} gutterBottom color={"var(--orange-peel)"}>
                            {album.title}
                        </Typography>
                        <Typography variant={"mainRM"} color={"var(--columbia-blue)"}>
                            {album.authors?.map(author => author.name).join(", ") || "Unknown"}
                        </Typography>
                    </Box>
                    <IconButton
                    onClick={(e) => {
                        handlePlayPlaylist(e)
                    }}
                        sx={{padding: 0}}
                        disableRipple={true}
                    >
                        <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                             height={"30px"}/>
                    </IconButton>
                </Box>
            </Box>

            <AlbumContextMenu
                contextMenu={contextMenu}
                onClose={handleCloseContextMenu}
                album={album}
            />
        </Box>
    );
};

export default AlbumAverageItem;