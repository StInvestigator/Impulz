import type { TrackSimpleDto } from "./DTO/TrackSimpleDto.ts";
import type { AlbumSimpleDto } from "./DTO/AlbumSimpleDto.ts";

export interface AuthorDto {
  id: number;
  name: string;
  bio: string;
  followersCount: number;
  tracks: TrackSimpleDto[];
  albums: AlbumSimpleDto[];
}
