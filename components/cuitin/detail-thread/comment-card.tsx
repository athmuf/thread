import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../ui/card';
import IconAction from '../icon-action';
import ColoredAvatar from '../colored-avatar';
import { formatRelativeTime } from '@/src/helper/format-relative-time';
import _default from 'dompurify';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Separator } from '../../ui/separator';
import { Comment } from '@/src/features/detail-thread/types';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hooks';
import { voteComment } from '@/src/features/vote/vote-slice';
import { updateCommentVote } from '@/src/features/detail-thread/detail-thread-slice';
import { openDialog } from '@/src/features/auth-dialog/auth-dialog-slice';

type CommentCardProps = {
  data: Comment;
};

type VoteType = 'neutral' | 'upVote' | 'downVote';

const CommentCard = ({ data }: CommentCardProps) => {
  const dispatch = useAppDispatch();
  const {
    owner,
    content,
    createdAt,
    upVotesBy,
    downVotesBy,
    id: commentId,
    voteData,
  } = data;
  const cleanBodyContent = _default.sanitize(content);
  const { profile } = useAppSelector(state => state.auth);
  const { data: thread } = useAppSelector(state => state.detailThread);
  const threadId = thread?.data.detailThread.id || '';

  const voteState = useMemo(() => {
    if (!profile?.id) return 'neutral';
    if (upVotesBy.includes(profile.id)) return 'upVote';
    if (downVotesBy.includes(profile.id)) return 'downVote';
    return 'neutral';
  }, [upVotesBy, downVotesBy, profile?.id]);

  const [vote, setVote] = useState<VoteType>(voteState);
  
  const handleLogin = () => {
    dispatch(openDialog('login'));
  };

  const handleVote = (type: VoteType) => {
    if (!profile?.id) {
      handleLogin();
    } else {
      const nextVote: VoteType = vote === type ? 'neutral' : type;

      void dispatch(
        voteComment({
          threadId: threadId,
          commentId: commentId,
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
          updateCommentVote({
            id: commentId,
            type: 'up',
            mode: 'remove',
            userId: profile.id,
          }),
        );
      }
      if (vote === 'downVote') {
        dispatch(
          updateCommentVote({
            id: commentId,
            type: 'down',
            mode: 'remove',
            userId: profile.id,
          }),
        );
      }

      // Add new vote
      if (nextVote === 'upVote') {
        dispatch(
          updateCommentVote({
            id: commentId,
            type: 'up',
            mode: 'add',
            userId: profile.id,
          }),
        );
      }
      if (nextVote === 'downVote') {
        dispatch(
          updateCommentVote({
            id: commentId,
            type: 'down',
            mode: 'add',
            userId: profile.id,
          }),
        );
      }

      setVote(nextVote);
    }
  };

  return (
    <Card className="shadow-none border-0 rounded-none py-3 gap-2 ml-14">
      <CardHeader className="flex items-center px-2 md:px-6">
        <ColoredAvatar size="lg" data={owner} />
        <div className="text-neutral-600 pl-2">{owner.name}</div>
      </CardHeader>
      <CardContent className="md:pl-20 pl-16">
        <div
          className="line-clamp-6 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: cleanBodyContent }}
        />
      </CardContent>
      <CardFooter className="md:pl-20 pl-16 flex flex-col items-start pt-3">
        <div className="text-sm text-neutral-500">
          {formatRelativeTime(createdAt)}
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
      </CardAction>
      <Separator />
    </Card>
  );
};

export default CommentCard;
