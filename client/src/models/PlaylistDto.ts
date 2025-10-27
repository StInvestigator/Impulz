import type {UserSimpleDto} from "./DTO/UserSimpleDto.ts";
import type {TrackSimpleDto} from "./DTO/track/TrackSimpleDto.ts";

export interface PlaylistDto {
    id: number;
    title: string;
    imgUrl: string;
    isPublic: boolean;
    owner: UserSimpleDto;
    createdAt: Date;
    tracks: TrackSimpleDto[];
}