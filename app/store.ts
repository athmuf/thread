import { configureStore } from '@reduxjs/toolkit';
import threadsSlice from '@/src/features/threads/threads-slice';
import usersSlice from '@/src/features/users/users-slice';
import authSlice from '@/src/features/auth/auth-slice';
import authDialogSlice from '@/src/features/auth-dialog/auth-dialog-slice';

const store = configureStore({
  reducer: {
    threads: threadsSlice,
    users: usersSlice,
    auth: authSlice,
    AuthDialog: authDialogSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
