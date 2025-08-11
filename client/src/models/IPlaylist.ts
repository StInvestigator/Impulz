import type {ITrackDTO} from "./DTO/ITrackDTO.ts";
import type {IUserDTO} from "./DTO/IUserDTO.ts";

export interface IPlaylist {
    id: number;
    title: string;
    imageUrl: string;
    isPublic: boolean;
    user: IUserDTO;
    createdAt: string;
    tracks: ITrackDTO[];
}