import Thread from './thread';
import { useAppSelector } from '@/src/hooks/redux-hooks';

const Threads = () => {
  const { data, isLoading, error } = useAppSelector(state => state.threads);

  return (
    <div>
      {data.map(thread => (
        <Thread thread={thread} key={thread.id} />
      ))}
    </div>
  );
};

export default Threads;
