import type { TrackSimpleDto } from "./DTO/track/TrackSimpleDto.ts";
import type { AlbumSimpleDto } from "./DTO/album/AlbumSimpleDto.ts";

export interface AuthorDto {
  id: string;
  name: string;
  imgUrl?: string;
  bio: string;
  followersCount: number;
  tracks: TrackSimpleDto[];
  albums: AlbumSimpleDto[];
}
