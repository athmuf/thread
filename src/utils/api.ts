import api from '../config/axios';

export const fetchThreads = async () => {
  await api.get('/threads');
};
