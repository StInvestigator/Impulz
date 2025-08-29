import type {IAuthorDTO} from "./DTO/IAuthorDTO.ts";
import type {ITrackDTO} from "./DTO/ITrackDTO.ts";

export interface IAlbum {
    id: number;
    title: string;
    imgUrl: string;
    authors: IAuthorDTO[];
    releaseDate: string;
    tracks: ITrackDTO[]; 
}