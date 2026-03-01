import { useAppSelector } from '@/src/hooks/redux-hooks';
import { selectFilteredThreads } from '@/src/features/threads/threads-slice';
import Thread from '../threads/thread';

const CategoryThreads = () => {
  const threads = useAppSelector(selectFilteredThreads);
  return (
    <div className="py-4">
      {threads.map(thread => (
        <Thread thread={thread} key={thread.id} />
      ))}
    </div>
  );
};

export default CategoryThreads;
