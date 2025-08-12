import type { IUserDTO } from "./IUserDTO";

export interface IPlaylistDTO {
    id: number;
    name: string;
    imgUrl: string;
    createdAt: string;
    authors: IUserDTO[];
}