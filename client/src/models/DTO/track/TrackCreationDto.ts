import type {AuthorSimpleDto} from "../AuthorSimpleDto.ts";
import type {GenreSimpleDto} from "../GenreSimpleDto.ts";

export interface TrackCreationDto {
    title: string;
    authors: AuthorSimpleDto[];
    genres: GenreSimpleDto[];
    clientFileName: string;
    clientCoverName: string;
}
