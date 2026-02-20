import { configureStore } from '@reduxjs/toolkit';
import threadsSlice from '@/src/features/threads/threads-slice';

const store = configureStore({
  reducer: {
    threads: threadsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
