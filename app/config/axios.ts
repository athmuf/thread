import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CUITIN_API,
  timeout: 5000,
});

instance.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('cuitin-token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
