// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';
import CountSlice from './slices/CountSlice';

const store = configureStore({
  reducer: {
    count: CountSlice,
  },
});

export default store;
