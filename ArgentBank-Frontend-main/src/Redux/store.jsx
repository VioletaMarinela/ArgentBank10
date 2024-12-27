// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slicer/AuthSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;