'use client';
import { useEffect } from 'react';
import { useAppDispatch } from '@/src/hooks/redux-hooks';
import { fetchUsers } from '@/src/features/users/users-slice';
import { fetchDetailThread } from '@/src/features/detail-thread/detail-thread-slice';

import ViewThread from './view-thread';
import Comments from './comments';
import CreateComment from './create-comment';

const ThreadContent = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchDetailThread(id));
    void dispatch(fetchUsers());
  }, [id]);

  return (
    <div className="w-full">
      <ViewThread />
      <CreateComment />
      <Comments />
    </div>
  );
};

export default ThreadContent;
