import { ReactNode } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import IconAction from '@/components/cuitin/icon-action';
import { IconActionProps } from '@/components/cuitin/icon-action';
import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';

export interface ButtonActionProps extends IconActionProps {}

const story: Meta<typeof IconAction> = {
  title: 'ButtonAction',
  component: IconAction,
  tags: ['autodocs'], 
};

export default story;

const TemplateStory: StoryFn<IconActionProps> = (args: IconActionProps) => (
  <IconAction {...args} >
    {args.children}
  </IconAction>
);

const WithTypeUpVote = TemplateStory.bind({});
WithTypeUpVote.args = {
  count: 3,
  active: false,
  actionType: 'voteUp',
  children: <ThumbsUp />
};

const WithTypeUpDown = TemplateStory.bind({});
WithTypeUpDown.args = {
  count: 2,
  active: false,
  actionType: 'voteDown',
  children: <ThumbsDown />
};

const WithTypeComment = TemplateStory.bind({});
WithTypeComment.args = {
  count: 4,
  active: false,
  actionType: 'comment',
  children: <MessageCircle />
};

export interface ButtonActionProps {
  /** Number displayed next to the icon */
  count: number;

  /** Highlight button if active */
  active: boolean;

  /** Type of action: voteUp, voteDown, or comment */
  actionType: 'voteUp' | 'voteDown' | 'comment';

  /** Icon element to render inside the button */
  children: ReactNode;
}

export { WithTypeUpVote, WithTypeUpDown, WithTypeComment };
