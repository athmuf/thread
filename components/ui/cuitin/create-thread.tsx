'use client';
import { Input } from '../input';
import { Button } from '../button';
import { Textarea } from '../textarea';
import { Separator } from '../separator';
import { CircleUser, Plus } from 'lucide-react';
import ColoredAvatar from './colored-avatar';
import { Card, CardAction, CardContent } from '../card';

import * as z from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '@/src/hooks/redux-hooks';
import {
  createThreads,
  fetchThreads,
} from '@/src/features/threads/threads-slice';

export const CreateThread = () => {
  const dispatch = useAppDispatch();
  const [showInputTag, setShowInputTag] = useState(false);

  const createThreadSchema = z.object({
    title: z.string(),
    body: z.string(),
    category: z.string(),
  });

  const threadForm = useForm<z.infer<typeof createThreadSchema>>({
    resolver: zodResolver(createThreadSchema),
    defaultValues: {
      title: '',
      body: '',
      category: '',
    },
  });

  const reactiveValue = threadForm.watch();

  const handleBlur = () => {
    if (!reactiveValue.category.trim()) {
      setShowInputTag(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof createThreadSchema>) => {
    try {
      await dispatch(createThreads(data))
        .unwrap()
        .then(res => toast.success(res.message || 'Success create thread'));
      threadForm.reset();
      void dispatch(fetchThreads());
    } catch (error) {
      const message = error as string;
      toast.error(message || 'Failed create thread. Try again later');
    }
  };

  const { profile, isAuthenticated } = useAppSelector(state => state.auth);
  if (isAuthenticated)
    return (
      <Card className="shadow-none border-x-0 border-t-0 rounded-none py-3 gap-2">
        <form onSubmit={threadForm.handleSubmit(onSubmit)}>
          <CardContent className="flex px-2 md:px-6">
            {profile ? (
              <ColoredAvatar size="lg" data={profile} />
            ) : (
              <CircleUser />
            )}
            <div className="text-neutral-600 pl-2 w-full">
              <Controller
                name="title"
                control={threadForm.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none shadow-none placeholder:font-semibold placeholder:text-base"
                    placeholder="What's on your mind?"
                  />
                )}
              />
              <Controller
                name="body"
                control={threadForm.control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none shadow-none placeholder:text-base"
                    placeholder="Share your thoughts..."
                  />
                )}
              />
              <Separator />
            </div>
          </CardContent>
          <CardAction className="md:pl-16 pl-12 flex justify-between w-full mt-3 mb-5">
            <div className="ml-4 flex items-center gap-2">
              <div className="text-sm">tags:</div>
              {showInputTag ? (
                <Controller
                  name="category"
                  control={threadForm.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      onBlur={handleBlur}
                      size={Math.max(reactiveValue.category.length, 1)}
                      className="rounded-full h-6 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none shadow-none"
                    />
                  )}
                />
              ) : (
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={() => setShowInputTag(true)}
                  className="rounded-full cursor-pointer hover:shadow-sm duration-200 transition-all "
                >
                  <Plus />
                </Button>
              )}
            </div>
            <Button className="rounded-full px-6 mr-8 cursor-pointer hover:shadow-md">
              Posting
            </Button>
          </CardAction>
        </form>
      </Card>
    );
};
