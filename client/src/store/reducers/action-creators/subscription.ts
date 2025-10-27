import { $authApi } from "../../../http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createSubscriptionSession = createAsyncThunk<
    string,
    { priceId: string, userId: string },
    { rejectValue: string }
>("subscription/createSession", async ({ priceId, userId }, { rejectWithValue }) => {
    try {
        const res = await $authApi.post("/payment/create-subscription-session", null, {
            params: {
                priceId: priceId,
                userId: userId
            }
        });
        return res.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return rejectWithValue("Subscription session creation error");
    }
});