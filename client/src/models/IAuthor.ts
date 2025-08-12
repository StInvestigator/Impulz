import type {ITrackDTO} from "./DTO/ITrackDTO.ts";
import type {IAlbumDTO} from "./DTO/IAlbumDTO.ts";
import type {IAuthorDTO} from "./DTO/IAuthorDTO.ts";

export interface IAuthor {
    bio: string;
    followersCount: number;
    subscriptionsCount: number;
    tracks: ITrackDTO[];
    albums: IAlbumDTO[];
    followersList: IAuthorDTO[];
}