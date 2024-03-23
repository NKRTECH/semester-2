import { createSlice } from '@reduxjs/toolkit';

// Create a slice using createSlice function
const counterSlice = createSlice({
  name: 'counter', // Name of the slice
  initialState: { value: 0 }, // Initial state of the slice
  reducers: {
    // Reducer functions to handle various actions
    increment: (state) => {
      state.value += 1; // Update the state to increment the counter by 1
    },
    decrement: (state) => {
      state.value -= 1; // Update the state to decrement the counter by 1
    },
    reset: (state) => {
      state.value = 0; // Reset the counter to 0
    },
    // New actions that take arguments
    incrementByAmount: (state, action) => {
      state.value += action.payload; // Increment the counter by the specified amount
    },
    decrementToMin: (state, action) => {
      // Decrement the counter by the specified amount, ensuring it doesn't go below 0
      state.value = Math.max(state.value - action.payload, 0);
    },
  },
});

// Extract generated action creators from the slice
export const { increment, decrement, reset, incrementByAmount, decrementToMin } = counterSlice.actions;

// Extract generated reducer function from the slice
export default counterSlice.reducer;