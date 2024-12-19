import { configureStore } from '@reduxjs/toolkit';
import AuthSliceReducer from './Slicer/AuthSlice';
import UserSliceReducer from './Slicer/UserSlice';

const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        user: UserSliceReducer
    }
});

export default store;