import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, RootUserProfile, RegisterProps } from './types';
import * as api from '@/src/utils/api';
import { AxiosError } from 'axios';

const initialState: AuthState = {
  profile: null,
  isAuthenticated: false,
};

const register = createAsyncThunk<
  RootUserProfile,
  RegisterProps,
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await api.register(data);
    return res;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(err.response?.data?.message || 'Failed register');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  // extraReducers: builder => {
  //   builder
  //     .addCase(fetchThreads.pending, state => {
  //       state.isLoading = true;
  //     })
  //     .addCase(fetchThreads.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.data = action.payload.data.threads;
  //     })
  //     .addCase(fetchThreads.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload as string;
  //     });
  // },
});

export { register };
export default authSlice.reducer;
