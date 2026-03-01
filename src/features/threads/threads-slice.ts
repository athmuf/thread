import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  ThreadsState,
  RootThreads,
  RootCreateThread,
  CreateThreadProps,
} from './types';
import * as api from '@/src/utils/api';
import { AxiosError } from 'axios';

const initialState: ThreadsState = {
  data: [],
  error: null,
  isLoading: true,
};

const fetchThreads = createAsyncThunk<
  RootThreads,
  void,
  { rejectValue: string }
>('threads/fetchThreads', async (_, { rejectWithValue }) => {
  try {
    const res = await api.fetchThreads();
    return res;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || 'Failed fetch threads data',
    );
  }
});

const createThreads = createAsyncThunk<
  RootCreateThread,
  CreateThreadProps,
  { rejectValue: string }
>('threads/createThreads', async (data, { rejectWithValue }) => {
  try {
    const res = await api.createThread(data);
    return res;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || 'Failed to create thread',
    );
  }
});

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    updateVote: (
      state,
      action: {
        payload: {
          id: string;
          type: 'up' | 'down';
          mode: 'add' | 'remove';
          userId: string;
        };
      },
    ) => {
      const { id, type, mode, userId } = action.payload;

      const thread = state.data.find(t => t.id === id);
      if (!thread) return;

      if (type === 'up') {
        thread.voteData.totalUpVote += mode === 'add' ? 1 : -1;
        if (mode === 'add') {
          thread.upVotesBy.push(userId);
        } else {
          thread.upVotesBy = thread.upVotesBy.filter(uid => uid !== userId);
        }
      }
      if (type === 'down') {
        thread.voteData.totalDownVote += mode === 'add' ? 1 : -1;
        if (mode === 'add') {
          thread.downVotesBy.push(userId);
        } else {
          thread.downVotesBy = thread.downVotesBy.filter(uid => uid !== userId);
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      // Fetch threads data
      .addCase(fetchThreads.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.isLoading = false;

        state.data = action.payload.data.threads.map(thread => ({
          ...thread,
          voteData: {
            totalUpVote: thread.upVotesBy.length,
            totalDownVote: thread.downVotesBy.length,
            totalComment: thread.totalComments,
          },
        }));
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { fetchThreads, createThreads };
export const { updateVote } = threadsSlice.actions;
export default threadsSlice.reducer;
