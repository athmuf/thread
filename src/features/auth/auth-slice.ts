import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AuthState,
  RootUserProfile,
  RegisterProps,
  RootLogin,
  LoginProps,
} from './types';
import * as api from '@/src/utils/api';
import { AxiosError } from 'axios';

const initialState: AuthState = {
  profile: null,
  isAuthenticated: false,
  register: {
    data: null,
    isLoading: false,
  },
  login: {
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

const login = createAsyncThunk<RootLogin, LoginProps, { rejectValue: string }>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.login(data);
      return res;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue(err.response?.data?.message || 'Failed login');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Register case
      .addCase(register.pending, state => {
        state.register.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.register.isLoading = false;
        state.register.data = action.payload;
      })
      .addCase(register.rejected, state => {
        state.register.isLoading = false;
      })

      // Login case
      .addCase(login.pending, state => {
        state.login.isLoading = true;
      })
      .addCase(login.fulfilled, state => {
        state.login.isLoading = false;
      })
      .addCase(login.rejected, state => {
        state.login.isLoading = false;
      });
  },
});

export { register, login };
export default authSlice.reducer;
