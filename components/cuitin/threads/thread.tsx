import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import IconAction from './icon-action';
import ColoredAvatar from './colored-avatar';
import { AvatarGroup } from '../ui/avatar';
import { Thread as ThreadType } from '@/src/features/threads/types';
import { formatRelativeTime } from '@/src/helper/format-relative-time';
import _default from 'dompurify';
import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hooks';
import { selectUserById, selectUsersByIds } from '@/src/helper/format-name';
import { useEffect, useMemo, useState } from 'react';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { voteThread } from '@/src/features/vote/vote-slice';
import { updateVote } from '@/src/features/threads/threads-slice';
import { openDialog } from '@/src/features/auth-dialog/auth-dialog-slice';

type ThreadCardProps = {
  thread: ThreadType;
};

type VoteType = 'neutral' | 'upVote' | 'downVote';

const Thread = ({ thread }: ThreadCardProps) => {
  const dispatch = useAppDispatch();
  const voteData = thread.voteData;
  const cleanBodyContent = _default.sanitize(thread.body);
  const { profile } = useAppSelector(state => state.auth);

  const [vote, setVote] = useState<VoteType>('neutral');

  useEffect(() => {
    if (profile?.id && thread) {
      const isUpVote = thread.upVotesBy.includes(profile.id) ?? false;
      const isDownVote = thread.downVotesBy.includes(profile.id) ?? false;

      if (isUpVote) {
        setVote('upVote');
      } else if (isDownVote) {
        setVote('downVote');
      } else {
        setVote('neutral');
      }
    }
  }, [profile?.id, thread]);

  const owner = useAppSelector(
    useMemo(() => selectUserById(thread.ownerId), [thread.ownerId]),
  );

  const likeBy = useAppSelector(
    useMemo(
      () => selectUsersByIds(thread?.upVotesBy || []),
      [thread?.upVotesBy],
    ),
  );

  const handleLogin = () => {
    dispatch(openDialog('login'));
  };

  const handleVote = (type: VoteType) => {
    if (!profile?.id) {
      handleLogin();
    } else {
      const nextVote: VoteType = vote === type ? 'neutral' : type;

      void dispatch(
        voteThread({
          threadId: thread.id,
          type:
            nextVote === 'neutral'
              ? 'neutral-vote'
              : nextVote === 'upVote'
                ? 'up-vote'
                : 'down-vote',
        }),
      );

      // Remove previous vote
      if (vote === 'upVote') {
        dispatch(
          updateVote({
            id: thread.id,
            type: 'up',
            mode: 'remove',
            userId: profile.id,
          }),
        );
      }
      if (vote === 'downVote') {
        dispatch(
          updateVote({
            id: thread.id,
            type: 'down',
            mode: 'remove',
            userId: profile.id,
          }),
        );
      }

      // Add new vote
      if (nextVote === 'upVote') {
        dispatch(
          updateVote({
            id: thread.id,
            type: 'up',
            mode: 'add',
            userId: profile.id,
          }),
        );
      }
      if (nextVote === 'downVote') {
        dispatch(
          updateVote({
            id: thread.id,
            type: 'down',
            mode: 'add',
            userId: profile.id,
          }),
        );
      }
      setVote(nextVote);
    }
  };

  const handleComment = () => {
    if (!profile?.id) {
      handleLogin();
    }
  };

  return (
    <Card className="shadow-none border-0 rounded-none py-3 gap-2">
      <Link href={`/threads/${thread.id}`}>
        <div>
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
        </div>
      </Link>
      <CardAction className="md:pl-16 pl-12">
        <IconAction
          count={voteData.totalUpVote}
          actionType="voteUp"
          onClick={() => handleVote('upVote')}
          active={vote === 'upVote'}
        >
          <ThumbsUp />
        </IconAction>
        <IconAction
          count={voteData.totalDownVote}
          actionType="voteDown"
          onClick={() => handleVote('downVote')}
          active={vote === 'downVote'}
        >
          <ThumbsDown />
        </IconAction>
        <Link href={profile?.id ? `/threads/${thread.id}` : '/'}>
          <IconAction
            count={voteData.totalComment}
            actionType="comment"
            onClick={handleComment}
          >
            <MessageCircle />
          </IconAction>
        </Link>
      </CardAction>
      <Separator />
    </Card>
  );
};

export default Thread;
