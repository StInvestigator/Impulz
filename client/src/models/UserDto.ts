import type { PlaylistSimpleDto } from "./DTO/PlaylistSimpleDto.ts";
import type { AlbumSimpleDto } from "./DTO/album/AlbumSimpleDto.ts";
import type {AuthorDto} from "./AuthorDto.ts";

export interface UserDto {
  id: string;
  username: string;
  email: string;
  imgUrl?: string;
  subscriptionsCount: number;
  favoriteAlbums: AlbumSimpleDto[];
  favoritePlaylists: PlaylistSimpleDto[];
  authorDto?: AuthorDto;
}
