import { configureStore } from '@reduxjs/toolkit';
import threadsSlice from '@/src/features/threads/threads-slice';
import usersSlice from '@/src/features/users/users-slice';
import authSlice from '@/src/features/auth/auth-slice';
import authDialogSlice from '@/src/features/auth-dialog/auth-dialog-slice';
import detailThreadSlice from '@/src/features/detail-thread/detail-thread-slice';
import createCommentSlice from '@/src/features/comment/comment-slice';
import voteSlice from '@/src/features/vote/vote-slice';
import leaderboardsSlice from '@/src/features/leaderboards/leaederboards-slice';

const store = configureStore({
  reducer: {
    threads: threadsSlice,
    users: usersSlice,
    auth: authSlice,
    authDialog: authDialogSlice,
    detailThread: detailThreadSlice,
    createComment: createCommentSlice,
    vote: voteSlice,
    leaderboards: leaderboardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
