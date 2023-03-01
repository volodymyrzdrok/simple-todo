import { configureStore } from '@reduxjs/toolkit';
import { todoReduces } from './todoSlice';

export const store = configureStore({
  reducer: {
    todo: todoReduces,
  },
});
