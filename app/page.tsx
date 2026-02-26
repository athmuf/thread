'use client';

import Threads from '../components/ui/cuitin/thread-list';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hooks';
import { fetchThreads } from '@/src/features/threads/threads-slice';
import { fetchUsers } from '@/src/features/users/users-slice';
import { fetchProfile } from '@/src/features/auth/auth-slice';
export default function Home() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    void dispatch(fetchThreads());
    void dispatch(fetchUsers());
    if (isAuthenticated) void dispatch(fetchProfile());
  }, [dispatch, isAuthenticated]);

  return (
    <div className="w-full">
      <Threads />
    </div>
  );
}
