import type { AlbumDto } from "./AlbumDto";
import type { PlaylistDto } from "./PlaylistDto";
import type { TrackDto } from "./TrackDto";

export type MediaItemDto = TrackDto | AlbumDto | PlaylistDto;

function isTrackDto(item: MediaItemDto): item is TrackDto {
  return 'durationSec' in item && 'album' in item && 'subtitles' in item;
}

function isAlbumDto(item: MediaItemDto): item is AlbumDto {
  return 'releaseDate' in item && Array.isArray(item.authors);
}

function isPlaylistDto(item: MediaItemDto): item is PlaylistDto {
  return 'isPublic' in item && 'owner' in item;
}

export { isTrackDto, isAlbumDto, isPlaylistDto };