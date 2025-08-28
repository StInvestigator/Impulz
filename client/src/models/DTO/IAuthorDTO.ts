import type {ITrack} from "../ITrack.ts";
import type {IAlbum} from "../IAlbum.ts";

export interface IAuthorDTO {
    bio: string;
    followersCount: number;
    subscriptionsCount: number;
    tracks: ITrack[];
    albums: IAlbum[];
    followersList: IAuthorDTO[];
}