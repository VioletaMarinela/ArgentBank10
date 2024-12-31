import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user: {
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
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
        setLastName: (state, action) => {
            state.user.lastName = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = initialState.user;
        },
    },
});

export const { setToken, setUser, setUsername, setFirstName, setLastName, logout } = authSlice.actions;

export default authSlice.reducer;