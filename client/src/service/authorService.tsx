import { $authApi } from "../http";

export const authorService = {
    subscribeToAuthor: async (authorId: string) => {
        const response = await $authApi.post(`/authors/${authorId}/subscribe`);
        return response.data;
    },

    unsubscribeFromAuthor: async (authorId: string) => {
        const response = await $authApi.delete(`/authors/${authorId}/unsubscribe`);
        return response.data;
    },

    checkSubscription: async (authorId: string) => {
        const response = await $authApi.get(`/authors/${authorId}/subscription-status`);
        return response.data;
    }
};