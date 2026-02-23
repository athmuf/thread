import { Avatar, AvatarFallback } from '../avatar';

type ColoredAvatarProps = React.ComponentProps<typeof Avatar> & {
  initialName: string;
};

const ColoredAvatar = ({ initialName, ...props }: ColoredAvatarProps) => {
  // const colors = [
  //   'bg-blue-400',
  //   'bg-cyan-400',
  //   'bg-emarald-400',
  //   'bg-fushcia-400',
  //   'bg-green-400',
  //   'bg-lime-400',
  //   'bg-oranye-400',
  //   'bg-pink-400',
  //   'bg-purple-400',
  //   'bg-red-400',
  //   'bg-rose-400',
  //   'bg-yellow-400',
  // ];
  // const getColorFromId = (id: string) => {
  //   let hash = 0;

  //   for (let i = 0; i < id.length; i++) {
  //     hash = id.charCodeAt(i) + ((hash << 5) - hash);
  //   }

  //   const index = Math.abs(hash) % colors.length;
  //   return colors[index];
  // };
  return (
    <Avatar {...props}>
      <AvatarFallback>{initialName}</AvatarFallback>
    </Avatar>
  );
};

export default ColoredAvatar;
