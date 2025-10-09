import type {AuthorSimpleDto} from "./DTO/AuthorSimpleDto.ts";
import type {TrackSimpleDto} from "./DTO/track/TrackSimpleDto.ts";

export interface AlbumDto {
    id: number;
    title: string;
    imgUrl: string;
    authors: AuthorSimpleDto[];
    releaseDate: Date;
    tracks: TrackSimpleDto[];
}