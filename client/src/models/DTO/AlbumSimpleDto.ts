import type {AuthorSimpleDto} from "./AuthorSimpleDto.ts";

export interface AlbumSimpleDto {
    id: number;
    title: string;
    imgUrl: string;
    authors: AuthorSimpleDto[];
}