export interface TrackCreationDto {
    title: string;
    authorIds: string[];
    genreIds: number[];
    clientFileName: string;
    clientCoverName: string;
}