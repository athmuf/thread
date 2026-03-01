import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { VoteState, RootVote, VoteProps } from './types';
import * as api from '@/src/utils/api';
import { AxiosError } from 'axios';

const initialState: VoteState = {
  data: null,
  error: null,
  isLoading: false,
};

const voteThread = createAsyncThunk<
  RootVote,
  VoteProps,
  { rejectValue: string }
>('vote/sendVoteThread', async (data, { rejectWithValue }) => {
  try {
    const res = await api.voteThread(data);
    return res;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(err.response?.data?.message || 'Failed vote');
  }
});

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch threads data
      .addCase(voteThread.pending, state => {
        state.isLoading = true;
      })
      .addCase(voteThread.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(voteThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { voteThread };
export default voteSlice.reducer;
