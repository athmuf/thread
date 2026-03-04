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
import { toast } from 'sonner';

export const initialState: AuthState = {
  profile: null,
  isAuthenticated: false,
  register: {
    data: null,
    isLoading: false,
  },
  login: {
    isLoading: false,
  },
  me: {
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
      localStorage.setItem('cuitin-token', res.data.token);
      return res;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue(err.response?.data?.message || 'Failed login');
    }
  },
);

const fetchProfile = createAsyncThunk<
  RootUserProfile,
  void,
  { rejectValue: string }
>('auth/getProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await api.getProfile();
    return res;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(err.response?.data?.message || 'Failed get profile');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.profile = null;
      state.isAuthenticated = false;
      localStorage.removeItem('cuitin-token');
      toast.success('Logout Berhasil');
    },
  },
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
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, state => {
        state.login.isLoading = false;
        state.isAuthenticated = false;
      })

      // Get profile case
      .addCase(fetchProfile.pending, state => {
        state.me.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, actions) => {
        state.me.isLoading = false;
        state.profile = actions.payload.data.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, state => {
        state.me.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export { register, login, fetchProfile };
export default authSlice.reducer;
