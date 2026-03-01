import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '@/src/utils/api';
import { AxiosError } from 'axios';
import {
  CreateCommentInitial,
  RootCreateComment,
  CreateCommentPayload,
} from './types';

interface CreateCommentThunkPayload {
  threadId: string;
  data: CreateCommentPayload;
}

const initialState: CreateCommentInitial = {
  data: null,
  error: null,
  isLoading: true,
};

const createComment = createAsyncThunk<
  RootCreateComment,
  CreateCommentThunkPayload,
  { rejectValue: string }
>('comment/createComment', async ({ threadId, data }, { rejectWithValue }) => {
  try {
    const res = await api.createComment({ threadId, data });
    return res;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || 'Failed to create comment',
    );
  }
});

const createCommentSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch threads data
      .addCase(createComment.pending, state => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { createComment };
export default createCommentSlice.reducer;
