import type { IAlbumDTO } from "./IAlbumDTO";
import type { IUserDTO } from "./IUserDTO";

export interface ITrackDTO {
    id: number;
    name: string;
    timePlay: string;
    imgUrl: string;
    fileUrl: string;
    authors: IUserDTO[];
    album: IAlbumDTO;
}

