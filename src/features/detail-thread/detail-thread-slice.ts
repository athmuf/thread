import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootDetailThread, DetailThreadState } from './types';
import * as api from '@/src/utils/api';
import { AxiosError } from 'axios';

const initialState: DetailThreadState = {
  data: null,
  error: null,
  isLoading: true,
  voteData: {
    totalDownVote: 0,
    totalUpVote: 0,
    totalComment: 0,
  },
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
  name: 'detail-thread',
  initialState,
  reducers: {
    updateVote: (
      state,
      action: {
        payload: {
          type: 'up' | 'down';
          mode: 'add' | 'remove';
        };
      },
    ) => {
      const { type, mode } = action.payload;

      if (type === 'up') {
        state.voteData.totalUpVote += mode === 'add' ? 1 : -1;
      }
      if (type === 'down') {
        state.voteData.totalDownVote += mode === 'add' ? 1 : -1;
      }
    },
  },
  extraReducers: builder => {
    builder
      // Fetch threads data
      .addCase(fetchDetailThread.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchDetailThread.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.voteData.totalUpVote =
          action.payload.data.detailThread.upVotesBy.length;
        state.voteData.totalDownVote =
          action.payload.data.detailThread.downVotesBy.length;
        state.voteData.totalComment =
          action.payload.data.detailThread.comments.length;
      })
      .addCase(fetchDetailThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { fetchDetailThread };
export const { updateVote } = detailThreadSlice.actions;
export default detailThreadSlice.reducer;
