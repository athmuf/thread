import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, RootUserProfile, RegisterProps } from './types';
import * as api from '@/src/utils/api';
import { AxiosError } from 'axios';

const initialState: AuthState = {
  profile: null,
  isAuthenticated: false,
  register: {
    data: null,
    isLoading: false,
  },
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
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.register.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.register.isLoading = false;
        state.register.data = action.payload;
      })
      .addCase(register.rejected, state => {
        state.register.isLoading = false;
      });
  },
});

export { register };
export default authSlice.reducer;
