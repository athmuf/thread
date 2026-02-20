'use client';

import Thread from '../src/components/Thread';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hooks';
import { fetchThreads } from '@/src/features/threads/threads-slice';

export default function Home() {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector(state => state.threads);

  useEffect(() => {
    void dispatch(fetchThreads());
  }, [dispatch]);

  console.log(data, 'data')
  return (
    <div>
      <Thread />
    </div>
  );
}
