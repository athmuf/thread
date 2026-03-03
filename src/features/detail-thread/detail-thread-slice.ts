import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  RootDetailThread,
  DetailThreadState,
  RootDetailThreadApi,
} from './types';
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
  RootDetailThreadApi,
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
    updateCommentVote: (
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

      const thread = state.data?.data.detailThread.comments.find(
        t => t.id === id,
      );
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
      .addCase(fetchDetailThread.pending, state => {
        state.isLoading = true;
        state.data?.data.detailThread.comments[0].voteData;
      })
      .addCase(fetchDetailThread.fulfilled, (state, action) => {
        state.isLoading = false;

        const detailThread = action.payload.data.detailThread;

        const enrichedComments = detailThread.comments.map(comment => ({
          ...comment,
          voteData: {
            totalUpVote: comment.upVotesBy.length,
            totalDownVote: comment.downVotesBy.length,
          },
        }));

        state.data = {
          ...action.payload,
          data: {
            detailThread: {
              ...detailThread,
              comments: enrichedComments,
            },
          },
        };

        state.voteData = {
          totalUpVote: detailThread.upVotesBy.length,
          totalDownVote: detailThread.downVotesBy.length,
          totalComment: enrichedComments.length,
        };
      })
      .addCase(fetchDetailThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { fetchDetailThread };
export const { updateVote, updateCommentVote } = detailThreadSlice.actions;
export default detailThreadSlice.reducer;
