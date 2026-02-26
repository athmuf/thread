import Thread from './thread';
import { useAppSelector } from '@/src/hooks/redux-hooks';

const Threads = () => {
  const { data, isLoading, error } = useAppSelector(state => state.threads);
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useAppSelector(state => state.users);

  return (
    <div>
      {data.map(thread => (
        <Thread thread={thread} key={thread.id} />
      ))}
    </div>
  );
};

export default Threads;
