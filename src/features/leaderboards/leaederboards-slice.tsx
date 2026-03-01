import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LeaderboardsState, RootLeaderboards } from './types';
import * as api from '@/src/utils/api';
import axios, { AxiosError } from 'axios';

const initialState: LeaderboardsState = {
  data: null,
  error: null,
  isLoading: true,
};

const fetchLeaderboards = createAsyncThunk<
  RootLeaderboards,
  void,
  { rejectValue: string }
>('leaderboards/fetchLeaderboards', async (_, { rejectWithValue, signal }) => {
  try {
    const res = await api.fetchLeaderboards(signal);
    return res;
  } catch (error: unknown) {
    if (axios.isCancel(error)) return rejectWithValue('Request canceled');
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || 'Failed fetch leaderboards data',
    );
  }
});

const threadsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch leaderboards data
      .addCase(fetchLeaderboards.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.isLoading = false;

        state.data = action.payload;
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { fetchLeaderboards };
export default threadsSlice.reducer;
