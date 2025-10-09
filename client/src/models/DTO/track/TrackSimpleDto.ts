import type {AuthorSimpleDto} from "../AuthorSimpleDto.ts";

export interface TrackSimpleDto {
    id: number;
    title: string;
    durationSec: number;
    imgUrl: string;
    authors: AuthorSimpleDto[];
    album: string;
    albumId: number;
}
