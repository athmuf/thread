'use client';

import Threads from '../components/ui/cuitin/thread-list';
import { useEffect } from 'react';
import { useAppDispatch } from '@/src/hooks/redux-hooks';
import { fetchThreads } from '@/src/features/threads/threads-slice';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchThreads());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Threads />
    </div>
  );
}
