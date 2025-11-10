import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserDto } from "../../../models/UserDto";
import { $authApi } from "../../../http";


export const fetchUserDetails = createAsyncThunk<UserDto,string>(
    'user/fetchUserDetails',
    async (userId) => {
        const response = await $authApi.get(`/users/Dto/${userId}`);
        return response.data;
    }
);

export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async ({ userId, username, imageFile }: {
        userId: string;
        username: string;
        imageFile?: File
    }) => {
        const formData = new FormData();
        formData.append('username', username);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        const response = await $authApi.post(`/users/updateCredentials/${userId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    }
);


export const updateUserEmail = createAsyncThunk<UserDto, { userId: string; email: string }>(
    'user/updateUserEmail',
    async ({ userId, email }) => {
        const formData = new FormData();
        formData.append("email", email);

        const response = await $authApi.put(`/users/updateCredentials/${userId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    }
);

export const updateUserPassword = createAsyncThunk<UserDto, { userId: string; currentPassword: string; newPassword: string }>(
    'user/updateUserPassword',
    async ({ userId, currentPassword, newPassword }) => {
        const formData = new FormData();
        formData.append("currentPassword", currentPassword);
        formData.append("newPassword", newPassword);

        const response = await $authApi.put(`/users/updateCredentials/${userId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    }
);

