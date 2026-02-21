import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootUsers, UsersState } from './types';
import * as api from '@/src/utils/api';
import { AxiosError } from 'axios';

const initialState: UsersState = {
  data: [],
  error: null,
  isLoading: true,
};

const fetchUsers = createAsyncThunk<RootUsers, void, { rejectValue: string }>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.fetchUsers();
      return res;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        err.response?.data?.message || 'Failed fetch threads data',
      );
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { fetchUsers };
export default usersSlice.reducer;
