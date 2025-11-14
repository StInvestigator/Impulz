import {$authApi} from "../../../http";

export const fetchAuthorTracksPaged = async (authorId: string, page: number, size: number) => {
    try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());

        const response = await $authApi.get(`/tracks/ByAuthor/Popular/${authorId}?${params}`);

        const tracks = response.data.page?.content || [];
        const totalPages = response.data.page?.totalPages || 1;

        return {
            tracks: tracks,
            totalPages: totalPages
        };
    } catch (error: unknown) {
        console.error('🎵 Ошибка API запроса:', {
            url: `/tracks/ByAuthor/Popular/${authorId}`,
            error: error
        });
        throw error;
    }
};