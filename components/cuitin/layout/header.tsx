'use client';

import ColoredAvatar from '../colored-avatar';
import {
  CircleUser,
  EllipsisVertical,
  LogIn,
  LogOut,
  User,
} from 'lucide-react';
import { useAppSelector } from '@/src/hooks/redux-hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { logout } from '@/src/features/auth/auth-slice';
import { useAppDispatch } from '@/src/hooks/redux-hooks';
import { openDialog } from '@/src/features/auth-dialog/auth-dialog-slice';
import { Button } from '../../ui/button';
import Link from 'next/link';
import ProfileDialog from '@/components/cuitin/layout/profile-dialog';
import { useState } from 'react';

const Header = () => {
  const { profile, isAuthenticated } = useAppSelector(state => state.auth);
  const [showProfile, setShowProfile] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(openDialog('login'));
  };

  const handleLogin = () => {
    dispatch(openDialog('login'));
  };

  return (
    <div className="flex justify-center items-center shadow-lg border-b">
      <div className="md:px-10 px-3 py-4 w-full max-w-5xl flex justify-between">
        <Link href="/">
          <div className="font-bold text-3xl text-orange-300">Cuitin</div>
        </Link>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer flex justify-center items-center">
                {isAuthenticated ? (
                  profile ? (
                    <ColoredAvatar size="lg" data={profile} />
                  ) : (
                    <CircleUser />
                  )
                ) : (
                  <EllipsisVertical size={16} />
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel
                  className="flex hover:bg-slate-100 duration-200 cursor-pointer"
                  onClick={() => setShowProfile(true)}
                >
                  <User size={12} />
                  <span className="ml-2">Profile</span>
                </DropdownMenuLabel>
                <DropdownMenuLabel
                  className="flex hover:bg-slate-100 duration-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut size={12} />
                  <span className="ml-2">Log Out</span>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
            </DropdownMenuContent>
            <ProfileDialog
              open={showProfile}
              onOpenChange={() => setShowProfile(false)}
            />
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleLogin}
          >
            <LogIn size={12} /> <span>Log In</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
