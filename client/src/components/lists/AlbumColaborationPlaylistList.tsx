// import AlbumAverageItem from "../items/album/AlbumAverageItem.tsx";
// import PublicPlaylistAverageItem from "../items/playlist/PublicPlaylistAverageItem.tsx";
import {Box} from "@mui/material";
// import ColaborationAverageItem from "../items/colaboration/ColaborationAverageItem.tsx";


// const albums = [
//     "Автор 1",
//     "Автор 2",
//     "Автор 3",
//     "Автор 4",
//     "Автор 5",
//     "Автор 1",
//     "Автор 2",
//     "Автор 3",
//     "Автор 4",
//     "Автор 5",
//     "Автор 1",
//     "Автор 2",
//     "Автор 3",
//     "Автор 4",
//     "Автор 5",
//     "Автор 1",
//     "Автор 2",
//     "Автор 3",
//     "Автор 4",
//     "Автор 5",
//     "Автор 1",
//     "Автор 2",
//     "Автор 3",
//     "Автор 4",
//     "Автор 5",
// ]

const AlbumColaborationPlaylistList = () => {
    return (
        <Box display={"grid"} sx={{
            gridTemplateColumns: "repeat(5, 1fr)"
        }} gap={3}>
            {/* {albums.map((album, index) =>
                index % 3 === 0
                ?
                <AlbumAverageItem key={index} album={album} itemHeight={360}/>
                : index % 2 === 0
                    ?
                    <PublicPlaylistAverageItem key={index} playlist={album} itemHeight={360}/>
                    :
                    <ColaborationAverageItem key={index} colaboration={album} itemHeight={360}/>
            )} */}
        </Box>
    );
};

export default AlbumColaborationPlaylistList;