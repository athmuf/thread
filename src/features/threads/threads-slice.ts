import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  ThreadsState,
  RootThreads,
  RootCreateThread,
  CreateThreadProps,
} from './types';
import * as api from '@/src/utils/api';
import { AxiosError } from 'axios';
import { RootState } from '@/app/store';

const initialState: ThreadsState = {
  data: [],
  error: null,
  isLoading: true,
  selectedCategory: 'all',
  categories: [],
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

export const selectFilteredThreads = (state: RootState) => {
  const { data, selectedCategory } = state.threads;

  if (selectedCategory === 'all') return data;

  return data.filter(thread => thread.category === selectedCategory);
};

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
    setSelectedCategory: (state, action: { payload: string }) => {
      state.selectedCategory = action.payload;
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

        const mappedThreads = action.payload.data.threads.map(thread => ({
          ...thread,
          voteData: {
            totalUpVote: thread.upVotesBy.length,
            totalDownVote: thread.downVotesBy.length,
            totalComment: thread.totalComments,
          },
        }));

        state.data = mappedThreads;

        const uniqueCategories = [
          ...new Set(mappedThreads.map(thread => thread.category)),
        ];

        state.categories = ['all', ...uniqueCategories];
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { fetchThreads, createThreads };
export const { updateVote, setSelectedCategory } = threadsSlice.actions;
export default threadsSlice.reducer;
