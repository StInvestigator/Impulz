import { createSlice } from "@reduxjs/toolkit";
import { createSubscriptionSession } from "./action-creators/subscription.ts";

type SubscriptionState = {
    loading: boolean;
    error?: string | null;
    lastSessionId?: string | null;
};


const initialState: SubscriptionState = { loading: false, error: null, lastSessionId: null };


const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSubscriptionSession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSubscriptionSession.fulfilled, (state, action) => {
                state.loading = false;
                state.lastSessionId = action.payload;
            })
            .addCase(createSubscriptionSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Error creating subscription session";
            });
    },
});

export const { clearError } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

export const selectLastSessionId = (state: SubscriptionState) => state.lastSessionId;