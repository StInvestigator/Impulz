import type { IUserDTO } from "./IUserDTO";

export interface IAlbumDTO {
    id: number;
    name: string;
    imgUrl: string;
    authors: IUserDTO[];
}