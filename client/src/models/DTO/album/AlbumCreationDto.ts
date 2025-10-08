import type { TrackCreationDto } from "../track/TrackCreationDto";

export interface AlbumCreationDto {
    title: string;
    authorIds: string[];
    releaseDate: string;
    tracks: TrackCreationDto[];
}