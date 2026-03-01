'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/src/hooks/redux-hooks';
import { fetchThreads } from '@/src/features/threads/threads-slice';
import { fetchUsers } from '@/src/features/users/users-slice';

import Tab from '@/components/layout/tab';
import Threads from '../components/ui/cuitin/thread-list';
import { CreateThread } from '@/components/ui/cuitin/create-thread';
import Leaderboards from '@/components/ui/cuitin/leaderboards';
import { fetchLeaderboards } from '@/src/features/leaderboards/leaederboards-slice';
import CategoryContent from '@/components/ui/cuitin/category/category-content';

export default function Home() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');

  useEffect(() => {
    void dispatch(fetchThreads());
    void dispatch(fetchUsers());
    void dispatch(fetchLeaderboards());
  }, [dispatch]);

  const renderTab = () => {
    if (currentTab === 'category') {
      return <CategoryContent />;
    } else if (currentTab === 'leaderboard') {
      return <Leaderboards />;
    } else {
      return (
        <div>
          <CreateThread />
          <Threads />
        </div>
      );
    }
  };

  return (
    <div className="w-full">
      <Tab />
      <div className="py-4">{renderTab()}</div>
    </div>
  );
}
