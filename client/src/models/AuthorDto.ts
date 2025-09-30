import type { TrackSimpleDto } from "./DTO/TrackSimpleDto.ts";
import type { AlbumSimpleDto } from "./DTO/AlbumSimpleDto.ts";

export interface AuthorDto {
  id: string;
  name: string;
  imgUrl?: string;
  bio: string;
  followersCount: number;
  tracks: TrackSimpleDto[];
  albums: AlbumSimpleDto[];
}
