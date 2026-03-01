import clsx from 'clsx';
import { Button } from '../button';

type IconActionProps = React.ComponentProps<typeof Button> & {
  children: React.ReactNode;
  count: number;
  active?: boolean;
  actionType?: 'voteUp' | 'voteDown' | 'comment';
};

const IconAction = ({
  children,
  count,
  actionType = 'voteUp',
  active = false,
  ...props
}: IconActionProps) => {
  return (
    <Button variant="ghost" className="hover:bg-transparent" {...props}>
      <div
        className={clsx(
          'cursor-pointer duration-300 transition-colors py-1 px-2 rounded-full',
          {
            'hover:text-blue-300 hover:bg-blue-100': actionType === 'voteUp',
            'hover:text-rose-300 hover:bg-rose-100': actionType === 'voteDown',
            'hover:text-emerald-300 hover:bg-emerald-100':
              actionType === 'comment',
            'text-blue-400 bg-blue-100': actionType === 'voteUp' && active,
            'text-rose-400 bg-rose-100': actionType === 'voteDown' && active,
            'text-emerald-400 bg-emerald-100':
              actionType === 'comment' && active,
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
