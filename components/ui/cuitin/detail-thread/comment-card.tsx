import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../card';
import IconAction from '../icon-action';
import ColoredAvatar from '../colored-avatar';
import { formatRelativeTime } from '@/src/helper/format-relative-time';
import _default from 'dompurify';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Separator } from '../../separator';
import { Comment } from '@/src/features/detail-thread/types';

type CommentCardProps = {
  data: Comment;
};

const CommentCard = ({ data }: CommentCardProps) => {
  const { owner, content, createdAt, upVotesBy, downVotesBy } = data;
  const cleanBodyContent = _default.sanitize(content);

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
        <IconAction count={upVotesBy.length}>
          <ThumbsUp />
        </IconAction>
        <IconAction count={downVotesBy.length}>
          <ThumbsDown />
        </IconAction>
      </CardAction>
      <Separator />
    </Card>
  );
};

export default CommentCard;
