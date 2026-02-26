'use client'
import { useAppSelector } from '@/src/hooks/redux-hooks';
import { Avatar } from '../avatar';
import ColoredAvatar from './colored-avatar';

const Header = () => {
  // const { profile } = useAppSelector(state => state.auth);
  const { data, isLoading, error } = useAppSelector(state => state.threads);
  return (
    <div className="flex justify-center items-center">
      <div className="md:px-16 px-3 w-full max-w-5xl flex justify-between">
        <div>C</div>
        <div></div>
        <div>
          <Avatar>AvatarImage</Avatar>
        </div>
      </div>
    </div>
  );
};

export default Header;
