import clsx from 'clsx';
import { Button } from '../button';

type IconActionProps = {
  children: React.ReactNode;
  count: number;
  type: 'voteUp' | 'voteDown' | 'comment';
};

const IconAction = ({ children, count, type = 'voteUp' }: IconActionProps) => {
  return (
    <Button variant="ghost" className="hover:bg-transparent">
      <div
        className={clsx(
          'cursor-pointer duration-300 transition-colors py-1 px-2 rounded-full',
          {
            'hover:text-blue-400 hover:bg-blue-100': type === 'voteUp',
            'hover:text-rose-400 hover:bg-rose-100': type === 'voteDown',
            'hover:text-emerald-400 hover:bg-emerald-100': type === 'comment',
          },
        )}
      >
        {children}
      </div>
      <span>{count}</span>
    </Button>
  );
};

export default IconAction;
