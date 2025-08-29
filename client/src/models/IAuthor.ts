import type { ITrackDTO } from "./DTO/ITrackDTO.ts";
import type { IAlbumDTO } from "./DTO/IAlbumDTO.ts";

export interface IAuthor {
  id: number;
  bio: string;
  followersCount: number;
  tracks: ITrackDTO[];
  albums: IAlbumDTO[];
}
