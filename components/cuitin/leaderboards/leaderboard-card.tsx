import clsx from 'clsx';
import { Card, CardContent } from '../../ui/card';
import { Separator } from '../../ui/separator';
import ColoredAvatar from '../colored-avatar';
import { Leaderboard } from '@/src/features/leaderboards/types';

type LeaderboardProps = {
  data: Leaderboard;
  index: number;
};
const LeaderboardCard = ({ data, index }: LeaderboardProps) => {
  return (
    <Card
      className={clsx({
        'bg-amber-100': index === 0,
        'bg-gray-100': index === 1,
        'bg-orange-100': index === 2,
      })}
    >
      <CardContent className="flex w-full">
        <div className="w-1/6 md:w-1/12 relative flex items-center">
          <div>{index + 1}</div>
          <Separator orientation="vertical" className="absolute right-6" />
        </div>
        <div className="w-4/6 md:w-11/12 relative flex">
          <div className="flex items-center">
            <ColoredAvatar data={data.user} />
            <span className="ml-3">{data.user.name}</span>
          </div>
          <Separator orientation="vertical" className="absolute right-0" />
        </div>
        <div className="w-1/6 md:w-1/12 flex items-center justify-end">
          {data.score}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
