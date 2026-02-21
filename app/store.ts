import { configureStore } from '@reduxjs/toolkit';
import threadsSlice from '@/src/features/threads/threads-slice';
import usersSlice from '@/src/features/users/users-slice';

const store = configureStore({
  reducer: {
    threads: threadsSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
