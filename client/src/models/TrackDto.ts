import type {AuthorSimpleDto} from "./DTO/AuthorSimpleDto.ts";
import type {GenreSimpleDto} from "./DTO/GenreSimpleDto.ts";
import type {SubtitleSimpleDto} from "./DTO/SubtitleSimpleDto.ts";
import type { AlbumSimpleDto } from "./DTO/album/AlbumSimpleDto.ts";

export interface TrackDto {
    id: number;
    title: string;
    imgUrl: string;
    durationSec: number;
    album: AlbumSimpleDto;
    authors: AuthorSimpleDto[];
    genres: GenreSimpleDto[];
    subtitles: SubtitleSimpleDto[];
}
