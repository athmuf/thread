import { useAppSelector } from '@/src/hooks/redux-hooks';

import ErrorState from '../error-state';
import SkeletonThreads from '../threads/skeleton-threads';
import LeaderboardsCard from './leaderboard-card';

const Leaderboards = () => {
  const { data, isLoading, error } = useAppSelector(
    state => state.leaderboards,
  );

  if (isLoading) {
    return <SkeletonThreads />;
  }

  if (error) {
    return <ErrorState />;
  }
  return (
    <div className="py-3 px-6">
      <div className="text-xl text-center font-semibold pb-5">
        Cuitin Leaderboards
      </div>
      <div className="space-y-6">
        {data?.data.leaderboards.map((user, index) => (
          <div key={user.user.id}>
            <LeaderboardsCard data={user} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboards;
