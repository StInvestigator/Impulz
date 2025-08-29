import type { IAlbumDTO } from "./IAlbumDTO";
import type { IUserDTO } from "./IUserDTO";

export interface ITrackDTO {
    id: number;
    title: string;
    durationSec: string;
    imgUrl: string;
    fileUrl: string;
    authors: IUserDTO[];
    album: IAlbumDTO;
}

