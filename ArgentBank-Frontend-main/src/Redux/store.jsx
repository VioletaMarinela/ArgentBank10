import { configureStore } from "@reduxjs/toolkit"

import firstNameReducer from "./Features/firstName"
import lastNameReducer from "./Features/lastName"
import userNameReducer from "./Features/userName"
import tokenReducer from "./Features/token"

const store = configureStore({
    reducer: {
        firstName: firstNameReducer,
        lastName: lastNameReducer,
        userName: userNameReducer,
        token: tokenReducer
    },
})
export default store;
