import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface AlertState {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}

const initialState: AlertState = {
    open: false,
    message: '',
    severity: 'info'
};

const AlertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<{ message: string; severity?: 'success' | 'error' | 'warning' | 'info' }>) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity || 'info';
        },
        hideAlert: (state) => {
            state.open = false;
            state.message = '';
        }
    }
});

export const { showAlert, hideAlert } = AlertSlice.actions;
export default AlertSlice.reducer;