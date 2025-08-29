import type {IAuthorDTO} from "./DTO/IAuthorDTO.ts";
import type {IGenreDTO} from "./DTO/IGenreDTO.ts";
import type {ISubtitleDTO} from "./DTO/ISubtitleDTO.ts";
import type {IAlbumDTO} from "./DTO/IAlbumDTO.ts";

export interface ITrack {
    id: number;
    title: string;
    imgUrl: string;
    fileUrl: string;
    durationSec: number;
    album: IAlbumDTO;
    authors: IAuthorDTO[];
    genres: IGenreDTO[];
    subtitles: ISubtitleDTO[];
    streamUrl: string;
}
