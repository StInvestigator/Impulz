import type {AuthorSimpleDto} from "../AuthorSimpleDto.ts";
import type {TrackSimpleDto} from "../track/TrackSimpleDto.ts";

export interface AlbumSimpleDto {
    id: number;
    title: string;
    imgUrl: string;
    authors: AuthorSimpleDto[];
    tracks?: TrackSimpleDto[];
}