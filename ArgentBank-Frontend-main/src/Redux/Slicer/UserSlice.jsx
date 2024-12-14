import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    firstName: "Tony",
};

export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUserProfile: (state, action) => {
            state.userName = action.payload.userName;
            state.firstName = action.payload.firstName;
        },
    },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;