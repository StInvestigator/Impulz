import type { AuthorSimpleDto } from "../AuthorSimpleDto";

export interface TrackSimpleDto {
    id: number;
    title: string;
    durationSec: number;
    imgUrl: string;
    authors: AuthorSimpleDto[];
    album: string;
    albumId: number;
}
