// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import fileUploadReducer from './features/fileUploadSlice';

const store = configureStore({
 reducer: {
    fileUpload: fileUploadReducer,
 },
});
export default store;