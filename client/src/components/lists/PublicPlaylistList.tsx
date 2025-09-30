import type { PlaylistSimpleDto } from '../../models/DTO/PlaylistSimpleDto';
import PublicPlaylistAverageItem from '../items/playlist/PublicPlaylistAverageItem';

interface PublicPlaylistListProps {
    playlists: PlaylistSimpleDto[];
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