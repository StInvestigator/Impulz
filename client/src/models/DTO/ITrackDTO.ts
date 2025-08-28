import type {IAlbum} from "../IAlbum.ts";
import type {IAuthor} from "../IAuthor.ts";
import type {IGenre} from "../IGenre.ts";
import type {ISubtitle} from "../ISubtitle.ts";

export interface ITrackDTO {
    id: string;
    title: string;
    imgUrl: string;
    fileUrl: string;
    durationSec: number;
    album: IAlbum;
    authors: IAuthor[];
    genre: IGenre;
    subtitles: ISubtitle;
}