import api from '../config/axios';
import { RootThreads } from '../features/threads/types';
import { RootUsers } from '../features/users/types';
import {
  RootUserProfile,
  RegisterProps,
  RootLogin,
  LoginProps,
} from '../features/auth/types';

export const fetchThreads = async (): Promise<RootThreads> => {
  const res = await api.get<RootThreads>('/threads');
  return res.data;
};

export const fetchUsers = async (): Promise<RootUsers> => {
  const res = await api.get<RootUsers>('/users');
  return res.data;
};

export const register = async (
  data: RegisterProps,
): Promise<RootUserProfile> => {
  const res = await api.post<RootUserProfile>('/register', data);
  return res.data;
};

export const login = async (data: LoginProps): Promise<RootLogin> => {
  const res = await api.post<RootLogin>('/login', data);
  return res.data;
};

export const getProfile = async (): Promise<RootUserProfile> => {
  const res = await api.get<RootUserProfile>('/users/me');
  return res.data;
};
