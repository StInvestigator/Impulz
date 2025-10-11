export interface TrackCreationDto {
    title: string;
    authorsIds: string[];
    genresIds: number[];
    clientFileName: string;
    clientCoverName: string;
}