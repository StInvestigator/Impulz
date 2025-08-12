import type {IPlaylistDTO} from "./DTO/IPlaylistDTO.ts";
import type {IAlbumDTO} from "./DTO/IAlbumDTO.ts";
import type {IAuthor} from "./IAuthor.ts";

export interface IUser {
    id: string;
    username: string;
    email: string;
    imgUrl: string;
    favoriteAlbums: IAlbumDTO[];
    favoritePlaylists: IPlaylistDTO[];
    author?: IAuthor;
}