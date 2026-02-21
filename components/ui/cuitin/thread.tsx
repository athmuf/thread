import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../card';
import { Badge } from '../badge';
import IconAction from './icon-action';
import { Avatar, AvatarFallback, AvatarGroup } from '../avatar';
import { Thread as ThreadType } from '@/src/features/threads/types';
import { formatRelativeTime } from '@/src/helper/format-relative-time';
import _default from 'dompurify';
import { Reply, ThumbsDown, ThumbsUp } from 'lucide-react';

type ThreadCardProps = {
  thread: ThreadType;
};

const Thread = ({ thread }: ThreadCardProps) => {
  const cleanBodyContent = _default.sanitize(thread.body);

  return (
    <Card className="shadow-none border-b-2 border-x-0 border-t-0 rounded-none py-3 gap-2">
      <CardHeader className="flex items-center px-2 md:px-6">
        <Avatar size="lg">
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <div className="text-neutral-600 pl-2">{thread.ownerId}</div>
      </CardHeader>
      <CardContent className="md:pl-20 pl-16">
        <CardTitle className="pb-2">{thread.title}</CardTitle>
        <div
          className="line-clamp-6 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: cleanBodyContent }}
        />
      </CardContent>
      <CardFooter className="md:pl-20 pl-16 flex flex-col items-start pt-3">
        <Badge variant="outline" className="cursor-pointer mb-4">
          #{thread.category}
        </Badge>
        {thread.upVotesBy.length > 0 && (
          <div className="flex items-center">
            <AvatarGroup>
              {thread.upVotesBy.slice(0, 3).map(user => (
                <Avatar key={user} size="sm">
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <div className="pl-2 text-sm">
              disukai oleh{' '}
              <span className="font-medium">{thread?.upVotesBy[0]}</span> dan
              lainnya
            </div>
          </div>
        )}
        <div className="mt-2 text-sm text-neutral-500">
          {formatRelativeTime(thread.createdAt)}
        </div>
      </CardFooter>
      <CardAction className="md:pl-16 pl-12">
        <IconAction count={thread.upVotesBy.length}>
          <ThumbsUp />
        </IconAction>
        <IconAction count={thread.downVotesBy.length}>
          <ThumbsDown />
        </IconAction>
        <IconAction count={thread.totalComments}>
          <Reply />
        </IconAction>
      </CardAction>
    </Card>
  );
};

export default Thread;
