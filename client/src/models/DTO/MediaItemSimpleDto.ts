import type { AlbumSimpleDto } from "./AlbumSimpleDto";
import type { PlaylistSimpleDto } from "./PlaylistSimpleDto";
import type { TrackSimpleDto } from "./TrackSimpleDto";

export type MediaItemSimpleDto = TrackSimpleDto | AlbumSimpleDto | PlaylistSimpleDto;

export function isTrackSimpleDto(item: MediaItemSimpleDto): item is TrackSimpleDto {
  return 'durationSec' in item && 'album' in item && Array.isArray(item.authors) && typeof item.authors[0] === 'string';
}

export function isAlbumSimpleDto(item: MediaItemSimpleDto): item is AlbumSimpleDto {
  return 'authors' in item && !('durationSec' in item) && !('createdAt' in item);
}

export function isPlaylistSimpleDto(item: MediaItemSimpleDto): item is PlaylistSimpleDto {
  return 'createdAt' in item && 'owner' in item;
}

