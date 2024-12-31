import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    userName: '',
    firstName: '',
    lastName: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
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
    },
});

export const { setToken, setUser, setUsername, setFirstName, setLastName, logout } = authSlice.actions;

export default authSlice.reducer;