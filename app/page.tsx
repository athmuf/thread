'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/src/hooks/redux-hooks';
import { fetchThreads } from '@/src/features/threads/threads-slice';
import { fetchUsers } from '@/src/features/users/users-slice';

import Threads from '../components/ui/cuitin/thread-list';
import { CreateThread } from '@/components/ui/create-thread';
import FloatingButton from '@/components/ui/cuitin/floating-button';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchThreads());
    void dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="w-full">
      <CreateThread />
      <Threads />
      <FloatingButton />
    </div>
  );
}
