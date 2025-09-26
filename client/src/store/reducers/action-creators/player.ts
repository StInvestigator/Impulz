import {$authApi} from "../../../http";

export const fetchAuthorTracksPaged = async (authorId: number, page: number, size: number) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());

    const response = await $authApi.get(`/tracks/ByAuthor/Popular/${authorId}?${params}`);
    return {
        tracks: response.data.content,
        totalPages: response.data.totalPages
    };
};
