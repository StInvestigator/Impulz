import type { AuthorSimpleDto } from "../AuthorSimpleDto";
import type { GenreSimpleDto } from "../GenreSimpleDto";

export interface TrackCreationFullDto {
    title: string;
    authors: AuthorSimpleDto[];
    genres: GenreSimpleDto[];
    clientFileName: File | null;
    clientCoverName: File | null;
}
