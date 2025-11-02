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

        const response = await $authApi.put(`/users/update/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
);
