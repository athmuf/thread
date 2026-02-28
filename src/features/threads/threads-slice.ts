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
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch threads data
      .addCase(fetchThreads.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.threads;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { fetchThreads, createThreads };
export default threadsSlice.reducer;
