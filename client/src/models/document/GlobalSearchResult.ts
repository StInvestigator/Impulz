import type {TrackDocument} from "./TrackDocument.ts";
import type {AuthorDocument} from "./AuthorDocument.ts";
import type {AlbumDocument} from "./AlbumDocument.ts";
import type {PlaylistDocument} from "./PlaylistDocument.ts";

export interface GlobalSearchResult {
    tracks: TrackDocument[];
    authors: AuthorDocument[];
    albums: AlbumDocument[];
    playlists: PlaylistDocument[];
}