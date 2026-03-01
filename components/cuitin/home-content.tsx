'use client';

import { fetchLeaderboards } from '@/src/features/leaderboards/leaederboards-slice';
import { fetchThreads } from '@/src/features/threads/threads-slice';
import { fetchUsers } from '@/src/features/users/users-slice';
import { useAppDispatch } from '@/src/hooks/redux-hooks';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import CategoryContent from './category/category-content';
import Leaderboards from './leaderboards/leaderboards';
import { CreateThread } from './detail-thread/create-thread';
import Threads from './threads/thread-list';
import Tab from './layout/tab';

const HomeContent = () => {
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
};

export default HomeContent;
