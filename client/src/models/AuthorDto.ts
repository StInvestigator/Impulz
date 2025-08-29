import type { TrackSimpleDto } from "./DTO/TrackSimpleDto.ts";
import type { AlbumSimpleDto } from "./DTO/AlbumSimpleDto.ts";

export interface AuthorDto {
  id: number;
  bio: string;
  followersCount: number;
  // TODO
  // subscriptions: number;
  tracks: TrackSimpleDto[];
  albums: AlbumSimpleDto[];
}
