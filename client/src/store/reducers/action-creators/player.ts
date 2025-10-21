import {$authApi} from "../../../http";

export const fetchAuthorTracksPaged = async (authorId: string, page: number, size: number) => {
    try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());

        console.log(`🎵 API запрос: /tracks/ByAuthor/Popular/${authorId}?${params}`);

        const response = await $authApi.get(`/tracks/ByAuthor/Popular/${authorId}?${params}`);

        console.log('🎵 Полный ответ от API:', response.data);

        const tracks = response.data.page?.content || [];
        const totalPages = response.data.page?.totalPages || 1;

        console.log('🎵 Извлеченные треки:', tracks.length);
        console.log('🎵 Извлеченные totalPages:', totalPages);

        return {
            tracks: tracks,
            totalPages: totalPages
        };
    } catch (error: any) {
        console.error('🎵 Ошибка API запроса:', {
            url: `/tracks/ByAuthor/Popular/${authorId}`,
            error: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        throw error;
    }
};