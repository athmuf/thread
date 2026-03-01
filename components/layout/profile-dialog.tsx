'use client';

import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { useAppSelector } from '@/src/hooks/redux-hooks';
import ColoredAvatar from '../ui/cuitin/colored-avatar';

type ProfileDialogProps = React.ComponentProps<typeof Dialog>;

const ProfileDialog = ({ open, onOpenChange }: ProfileDialogProps) => {
  const { profile } = useAppSelector(state => state.auth);
  if (!profile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>Error fetch profile. Try again later.</DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center justify-center py-24 md:w-96 gap-0">
        <DialogTitle className="mb-10">Account Information</DialogTitle>
        <ColoredAvatar data={profile} size="lg" className="mb-6" />
        <div className="font-semibold text-neutral-700">{profile.name}</div>
        <div className="text-neutral-500">{profile.email}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
