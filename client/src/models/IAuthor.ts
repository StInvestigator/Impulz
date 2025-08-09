import type {ITrackDTO} from "./DTO/ITrackDTO.ts";
import type {IAlbumDTO} from "./DTO/IAlbumDTO.ts";
import type {IAuthorDTO} from "./DTO/IAuthorDTO.ts";

export interface IAuthor {
    id: number;
    bio: string;
    followersCount: number;
    subscriptions: number;
    tracks: ITrackDTO[];
    albums: IAlbumDTO[];
    followersList: IAuthorDTO[];
}