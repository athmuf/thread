import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootDetailThread, DetailThreadState } from './types';
import * as api from '@/src/utils/api';
import { AxiosError } from 'axios';

const initialState: DetailThreadState = {
  data: null,
  error: null,
  isLoading: true,
};

const fetchDetailThread = createAsyncThunk<
  RootDetailThread,
  string,
  { rejectValue: string }
>('detailThreads/fetchDetailThread', async (id, { rejectWithValue }) => {
  try {
    const res = await api.fetchDetailThread(id);
    return res;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || 'Failed fetch detail thread',
    );
  }
});

const detailThreadSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch threads data
      .addCase(fetchDetailThread.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchDetailThread.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDetailThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { fetchDetailThread };
export default detailThreadSlice.reducer;
