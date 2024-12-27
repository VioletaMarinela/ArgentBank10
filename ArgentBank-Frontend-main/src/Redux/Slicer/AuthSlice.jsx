// authSlice.js  
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: {
            email: "",
            firstName: "",
            lastName: "",
            userName: "",
        },
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        setUsername: (state, action) => {
            state.user.userName = action.payload;
        },
        setFirstName: (state, action) => {
            state.user.firstName = action.payload;
        },
        setLirstName: (state, action) => {
            state.user.lastName = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = { email: "", firstName: "", lastName: "", userName: "" }; // Reset to initial state  
        },
    },
});

export const { setToken, setUser, setUsername, setFirstName, setLastName, logout } = authSlice.actions;

export default authSlice.reducer;