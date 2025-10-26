import PublicPlaylistAverageItem from '../items/playlist/PublicPlaylistAverageItem';
import type {PlaylistDto} from "../../models/PlaylistDto.ts";

interface PublicPlaylistListProps {
    playlists: PlaylistDto[];
}

function PublicPlaylistList({ playlists }: PublicPlaylistListProps) {
    if (!playlists || playlists.length === 0) {
        return <div>Empty</div>;
    }

    return (
        <>
            {playlists.map((playlist) =>
                <PublicPlaylistAverageItem key={playlist.id} playlist={playlist} itemHeight={360}/>
            )}
        </>
    );
}

export default PublicPlaylistList