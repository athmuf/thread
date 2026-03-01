'use client';

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
import { formatRelativeTime } from '@/src/helper/format-relative-time';
import _default from 'dompurify';
import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hooks';
import { selectUsersByIds } from '@/src/helper/format-name';
import { useEffect, useMemo, useState } from 'react';
import { Separator } from '../separator';
import ErrorState from './error-state';
import SkeletonThreads from './skeleton-threads';
import { updateVote } from '@/src/features/detail-thread/detail-thread-slice';
import { voteThread } from '@/src/features/vote/vote-slice';
import { openDialog } from '@/src/features/auth-dialog/auth-dialog-slice';

type VoteType = 'neutral' | 'upVote' | 'downVote';

const ViewThread = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, voteData } = useAppSelector(
    state => state.detailThread,
  );

  const { profile } = useAppSelector(state => state.auth);

  const [vote, setVote] = useState<VoteType>('neutral');

  useEffect(() => {
    if (profile?.id && data) {
      const isUpVote =
        data.data.detailThread.upVotesBy.includes(profile.id) ?? false;
      const isDownVote =
        data.data.detailThread.downVotesBy.includes(profile.id) ?? false;

      if (isUpVote) {
        setVote('upVote');
      } else if (isDownVote) {
        setVote('downVote');
      } else {
        setVote('neutral');
      }
    }
  }, [profile?.id, data]);

  const thread = data?.data.detailThread;

  const likeBy = useAppSelector(
    useMemo(
      () => selectUsersByIds(thread?.upVotesBy || []),
      [thread?.upVotesBy],
    ),
  );

  if (isLoading) {
    return <SkeletonThreads />;
  }

  if (error || !thread) {
    return <ErrorState />;
  }

  const cleanBodyContent = _default.sanitize(thread.body);

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

      // remove previous vote
      if (vote === 'upVote') {
        dispatch(updateVote({ type: 'up', mode: 'remove' }));
      }
      if (vote === 'downVote') {
        dispatch(updateVote({ type: 'down', mode: 'remove' }));
      }

      // add new vote
      if (nextVote === 'upVote') {
        dispatch(updateVote({ type: 'up', mode: 'add' }));
      }
      if (nextVote === 'downVote') {
        dispatch(updateVote({ type: 'down', mode: 'add' }));
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
      <CardHeader className="flex items-center px-2 md:px-6">
        <ColoredAvatar size="lg" data={thread.owner} />
        <div className="text-neutral-600 pl-2">{thread.owner.name}</div>
      </CardHeader>
      <CardContent className="md:pl-20 pl-16">
        <CardTitle className="pb-2">{thread.title}</CardTitle>
        <div dangerouslySetInnerHTML={{ __html: cleanBodyContent }} />
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
              disukai oleh <span className="font-medium">{likeBy[0].name}</span>{' '}
              dan lainnya
            </div>
          </div>
        )}
        <div className="mt-2 text-sm text-neutral-500">
          {formatRelativeTime(thread.createdAt)}
        </div>
      </CardFooter>
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
        <IconAction
          count={voteData.totalComment}
          actionType="comment"
          onClick={handleComment}
        >
          <MessageCircle />
        </IconAction>
      </CardAction>
      <Separator />
    </Card>
  );
};

export default ViewThread;
