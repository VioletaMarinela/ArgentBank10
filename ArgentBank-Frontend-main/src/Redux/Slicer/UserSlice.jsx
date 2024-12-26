import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: ""
}

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.userName = action.payload.userName;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        },
    },
});

export default userSlice.reducer;
export const { setUserProfile } = userSlice.actions;