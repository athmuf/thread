import api from '../config/axios';
import { RootThreads } from '../features/threads/types';

export const fetchThreads = async (): Promise<RootThreads> => {
  const res = await api.get<RootThreads>('/threads');
  return res.data;
};
