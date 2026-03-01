'use client';
import { Button } from '../../button';
import { CircleUser } from 'lucide-react';
import { Textarea } from '../../textarea';
import ColoredAvatar from '../colored-avatar';
import { Card, CardContent } from '../../card';

import * as z from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { createComment } from '@/src/features/comment/comment-slice';
import { useAppSelector, useAppDispatch } from '@/src/hooks/redux-hooks';
import { fetchDetailThread } from '@/src/features/detail-thread/detail-thread-slice';

export const CreateComment = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(state => state.detailThread);
  const threadId = data?.data.detailThread.id;

  const createCommentSchema = z.object({
    content: z.string(),
  });

  const commentForm = useForm<z.infer<typeof createCommentSchema>>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof createCommentSchema>) => {
    if (threadId)
      try {
        await dispatch(
          createComment({
            threadId: threadId,
            data: { content: data.content },
          }),
        )
          .unwrap()
          .then(res => toast.success(res.message || 'Success create comment'));
        commentForm.reset();
        void dispatch(fetchDetailThread(threadId));
      } catch (error) {
        const message = error as string;
        toast.error(message || 'Failed create comment. Try again later');
      }
  };

  const { profile, isAuthenticated } = useAppSelector(state => state.auth);
  if (isAuthenticated)
    return (
      <Card className="shadow-none border-x-0 border-t-0 rounded-none py-3 gap-2">
        <form onSubmit={commentForm.handleSubmit(onSubmit)}>
          <CardContent className="flex px-2 md:px-6">
            {profile ? (
              <ColoredAvatar size="lg" data={profile} />
            ) : (
              <CircleUser />
            )}
            <div className="text-neutral-600 pl-2 w-full flex space-x-3 items-center">
              <Controller
                name="content"
                control={commentForm.control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none shadow-none placeholder:text-base"
                    placeholder="Posting your reply..."
                  />
                )}
              />
              <Button className="rounded-full px-6 cursor-pointer hover:shadow-md">
                Reply
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    );
};

export default CreateComment;
