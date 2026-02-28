'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hooks';
import { fetchProfile } from '../features/auth/auth-slice';

export const AuthInitializer = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('cuitin-token');

    if (token && !isAuthenticated) {
      void dispatch(fetchProfile());
    }
  }, [dispatch]);

  return null;
};
