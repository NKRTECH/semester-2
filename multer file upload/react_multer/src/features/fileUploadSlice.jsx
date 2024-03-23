// src/features/fileUploadSlice.js
import { createSlice } from '@reduxjs/toolkit';

const fileUploadSlice = createSlice({
 name: 'fileUpload',
 initialState: {
    loading: false,
    error: null,
 },
 reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
 },
});

export const { setLoading, setError } = fileUploadSlice.actions;

export default fileUploadSlice.reducer;


// src/features/fileUploadSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// export const fileUploadSlice = createSlice({
//     name: 'fileUpload',
//     initialState: {
//         file: null,
//         loading: false,
//         error: null,
//     },
//     reducers: {
//         setFile: (state, action) => {
//             state.file = action.payload;
//         },
//         setLoading: (state, action) => {
//             state.loading = action.payload;
//         },
//         setError: (state, action) => {
//             state.error = action.payload;
//         },
//     },
// });

// export const { setFile, setLoading, setError } = fileUploadSlice.actions;
// export default fileUploadSlice.reducer;
