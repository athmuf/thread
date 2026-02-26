import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { createInitial } from '@/src/helper/format-name';
import { User } from '@/src/features/auth/types';

type ColoredAvatarProps = React.ComponentProps<typeof Avatar> & {
  data: User;
};

const ColoredAvatar = ({ data, ...props }: ColoredAvatarProps) => {
  const initialName = createInitial(data.name) || 'U';
  return (
    <Avatar {...props}>
      <AvatarImage
        src={data.avatar}
        alt={initialName}
        className={!data ? 'grayscale' : ''}
      />
      <AvatarFallback>{initialName}</AvatarFallback>
    </Avatar>
  );
};

export default ColoredAvatar;
