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
