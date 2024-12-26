import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: ""
}

export const userNameSlice = createSlice({

    name: "userName",
    initialState,
    reducers: {
        getUserName: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { getUserName } = userNameSlice.actions
export default userNameSlice.reducer