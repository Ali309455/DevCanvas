import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    role: 'guest'
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login : (state, action) => {
            state.status = true;
            state.userData = action.payload;
            state.role = action.payload?.role || 'reader';
        },
        logout : (state) => {
            state.status = false;
            state.userData = null;
            state.role = 'guest';
        },
        updateRole : (state, action) => {
            state.role = action.payload;
            if (state.userData) {
                state.userData.role = action.payload;
            }
        }
    },
});

export const { login, logout, updateRole } = authSlice.actions;
export default authSlice.reducer;