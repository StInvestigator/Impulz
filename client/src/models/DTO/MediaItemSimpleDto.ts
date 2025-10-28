import type { PlaylistDto } from "../PlaylistDto.ts";
import type { AlbumSimpleDto } from "./album/AlbumSimpleDto";
import type { GenreSimpleDto } from "./GenreSimpleDto.ts";
import type {TrackSimpleDto} from "./track/TrackSimpleDto.ts";

export type MediaItemSimpleDto = TrackSimpleDto | AlbumSimpleDto | GenreSimpleDto | PlaylistDto;

export function isTrackSimpleDto(item: MediaItemSimpleDto): item is TrackSimpleDto {
  return 'durationSec' in item && 'album' in item && Array.isArray(item.authors) && typeof item.authors[0] === 'string';
}

export function isAlbumSimpleDto(item: MediaItemSimpleDto): item is AlbumSimpleDto {
  return 'authors' in item && !('durationSec' in item) && !('createdAt' in item);
}

export function isPlaylistDto(item: MediaItemSimpleDto): item is PlaylistDto  {
  return 'createdAt' in item && 'owner' in item;
}
