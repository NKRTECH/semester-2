import { createSelector } from '@reduxjs/toolkit';

export const selectCount = (state) => state.counter.value;

// Example of a memoized selector
export const selectCountIsEven = createSelector(
  [selectCount],
  (count) => count %  2 ===  0
);
