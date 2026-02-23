import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import * as api from '@/src/utils/api';
import { RootUsers, User } from './types';

export const usersAdapter = createEntityAdapter({
  selectId: (user: User) => user.id,
});

const initialState = usersAdapter.getInitialState({
  error: null as string | null,
  isLoading: true,
});

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
        usersAdapter.setAll(state, action.payload.data.users);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { fetchUsers };
export default usersSlice.reducer;
