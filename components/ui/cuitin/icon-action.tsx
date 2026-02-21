import { Button } from '../button';

type IconActionProps = {
  children: React.ReactNode;
  count: number;
};

const IconAction = ({ children, count }: IconActionProps) => {
  return (
    <Button variant="ghost" className="hover:bg-transparent">
      <div className="cursor-pointer hover:text-amber-400 duration-300 transition-colors">
        {children}
      </div>
      <span>{count}</span>
    </Button>
  );
};

export default IconAction;
