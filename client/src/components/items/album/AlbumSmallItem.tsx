import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import type {FC} from "react";
import { useTranslation } from 'react-i18next';
import type { AlbumSimpleDto } from "../../../models/DTO/AlbumSimpleDto";

interface AlbumItemProps {
    album: AlbumSimpleDto;
    itemWidth: number;
    color?: "dark" | "light";
}

const AlbumSmallItem: FC<AlbumItemProps> = ({album, itemWidth, color = "light"}) => {

    const { t } = useTranslation('other')
    // const route = useAppNavigate()

    return (
        <Box
            sx={{
                width: itemWidth,
                boxShadow: "none",
                color: 'black',
                flexShrink: 0,
                cursor: "pointer",
                transition: 'background-color 0.3s ease',
                backgroundImage: `url(${album.imgUrl || ""})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // "&:hover": {
                //     backgroundColor: "gray"
                // }
            }}
            // onClick={() => route(`/playlist/${playlist}`)}
        >
            <Box position={"relative"} width={itemWidth} height={itemWidth} bgcolor={"white"} borderRadius={"10px"}>
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    sx={{
                        padding: 0,
                        position: "absolute",
                        top: 80,
                        left: 80
                    }}
                >
                    <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                         height={"30px"}/>
                </IconButton>
            </Box>
            <Box display="flex" flexDirection="column" flexGrow={1} mt={1} color={color === "dark" ? "var(--dark-purple)" : "var(--orange-peel)"}>
                <Typography gutterBottom variant="mainSbL">
                    {album.title}
                </Typography>
                <Typography variant="mainRM">
                    {t("title-album")} &middot; {album.authors.join(", ") || "Unknown"}
                </Typography>
            </Box>
        </Box>
    );
};

export default AlbumSmallItem;