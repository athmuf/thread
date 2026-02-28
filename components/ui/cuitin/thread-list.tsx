import Thread from './thread';
import SkeletonThreads from './skeleton-threads';
import { useAppSelector } from '@/src/hooks/redux-hooks';
import ErrorState from './error-state';

const Threads = () => {
  const { data, isLoading, error } = useAppSelector(state => state.threads);
  if (isLoading) {
    return <SkeletonThreads />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="py-4">
      {data.map(thread => (
        <Thread thread={thread} key={thread.id} />
      ))}
    </div>
  );
};

export default Threads;
