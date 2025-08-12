import type {IAuthorDTO} from "./DTO/IAuthorDTO.ts";
import type {IGenreDTO} from "./DTO/IGenreDTO.ts";
import type {ISubtitleDTO} from "./DTO/ISubtitleDTO.ts";

export interface ITrack {
    id: number;
    name: string;
    imgUrl: string;
    fileUrl: string;
    timePlay: string;
    authors: IAuthorDTO[];
    genres: IGenreDTO[];
    subtitles: ISubtitleDTO[];
}