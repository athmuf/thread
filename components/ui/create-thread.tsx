import { useAppSelector } from '@/src/hooks/redux-hooks';
import { Card, CardAction, CardContent, CardTitle } from './card';
import ColoredAvatar from './cuitin/colored-avatar';
import { Input } from './input';
import { Separator } from './separator';
import { Button } from './button';
import { CircleUser } from 'lucide-react';
import { Textarea } from './textarea';

export const CreateThread = () => {
  const { profile, isAuthenticated } = useAppSelector(state => state.auth);
  if (isAuthenticated)
    return (
      <Card className="shadow-none border-b-2 border-x-0 border-t-0 rounded-none py-3 gap-2">
        <CardContent className="flex px-2 md:px-6">
          {profile ? (
            <ColoredAvatar size="lg" data={profile} />
          ) : (
            <CircleUser />
          )}
          <div className="text-neutral-600 pl-2 w-full">
            <Input
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none shadow-none placeholder:font-semibold placeholder:text-base"
              placeholder="What's on your mind?"
            />
            <Textarea
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none shadow-none placeholder:text-base"
              placeholder="Share your thoughts..."
            />
          </div>
        </CardContent>
        <Separator />
        <CardAction className="md:pl-16 pl-12 flex justify-between w-full">
          <Input />
          <Button className="rounded-full px-6">Posting</Button>
        </CardAction>
      </Card>
    );
};
