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
import ColoredAvatar from './colored-avatar';
import { AvatarGroup } from '../avatar';
import { Thread as ThreadType } from '@/src/features/threads/types';
import { formatRelativeTime } from '@/src/helper/format-relative-time';
import _default from 'dompurify';
import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useAppSelector } from '@/src/hooks/redux-hooks';
import { selectUserById, selectUsersByIds } from '@/src/helper/format-name';
import { useMemo } from 'react';
import { Separator } from '../separator';
import Link from 'next/link';

type ThreadCardProps = {
  thread: ThreadType;
};

const Thread = ({ thread }: ThreadCardProps) => {
  const cleanBodyContent = _default.sanitize(thread.body);
  const owner = useAppSelector(
    useMemo(() => selectUserById(thread.ownerId), [thread.ownerId]),
  );

  const likeBy = useAppSelector(
    useMemo(
      () => selectUsersByIds(thread?.upVotesBy || []),
      [thread?.upVotesBy],
    ),
  );

  return (
    <Link href={`/threads/${thread.id}`}>
      <Card className="shadow-none border-0 rounded-none py-3 gap-2">
        <CardHeader className="flex items-center px-2 md:px-6">
          <ColoredAvatar size="lg" data={owner} />
          <div className="text-neutral-600 pl-2">{owner.name}</div>
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
                {likeBy.slice(0, 3).map((user, index) => (
                  <ColoredAvatar key={index} size="sm" data={user} />
                ))}
              </AvatarGroup>
              <div className="pl-2 text-sm">
                disukai oleh{' '}
                <span className="font-medium">{likeBy[0].name}</span> dan
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
            <MessageCircle />
          </IconAction>
        </CardAction>
        <Separator />
      </Card>
    </Link>
  );
};

export default Thread;
