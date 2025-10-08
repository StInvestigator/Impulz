import {Box, IconButton, Link, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import type {FC} from "react";
import type { AlbumSimpleDto } from "../../../models/DTO/album/AlbumSimpleDto";
// import {usePlayTrack} from "../../../hooks/usePlayTrack.tsx";
interface AlbumItemProps {
    album: AlbumSimpleDto;
    itemHeight: number;
    itemWidth: number;
}

const AlbumAverageItem: FC<AlbumItemProps> = ({album, itemHeight,itemWidth}) => {
    // const { playPlaylist } = usePlayTrack();
    
    return (
        <Box
            sx={{
                width: "100%",
                position: "relative",
            }}

        >
            <Link href={`/album/${album.id}"`} style={{ textDecoration: 'none' }}>
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
            </Link>
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
                        sx={{padding: 0}}
                        // onClick={() => playPlaylist(album.tracks || [])}
                        disableRipple={true}
                    >
                        <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                             height={"30px"}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default AlbumAverageItem;