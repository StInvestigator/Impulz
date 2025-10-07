import type { UserSimpleDto } from "./UserSimpleDto";

export interface PlaylistSimpleDto {
    id: number;
    title: string;
    imgUrl: string;
    createdAt: Date;
    owner: UserSimpleDto;
    tracksCount: number;
}