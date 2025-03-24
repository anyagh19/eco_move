import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: localStorage.getItem("status") === "true" || false,
    userData: JSON.parse(localStorage.getItem("userData")) || null,
    role: localStorage.getItem("role") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.role = action.payload.role || null;

            // Persist data in localStorage
            localStorage.setItem("status", "true");
            localStorage.setItem("userData", JSON.stringify(action.payload.userData));
            localStorage.setItem("role", action.payload.role || null);
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.role = null;

            // Remove from localStorage
            localStorage.removeItem("status");
            localStorage.removeItem("userData");
            localStorage.removeItem("role");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
