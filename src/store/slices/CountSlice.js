// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

const CountSlice = createSlice({
  name: 'count',
  initialState: {
    totalCount: 0,
    landlordCount: 0,
    roommateCount: 0,
    tenantCount: 0,
  },
  reducers: {
    totalCount(state, action) {
      state.totalCount = action.payload;
    },
  },
});

export const { totalCount } = CountSlice.actions;
export default CountSlice.reducer;
