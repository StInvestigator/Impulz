import type { IUserDTO } from "./IUserDTO";

export interface IAlbumDTO {
    id: number;
    name: string;
    imgUrl: string;
    createdAt: string;
    authors: IUserDTO[];
}