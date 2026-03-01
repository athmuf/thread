export interface VoteProps {
  threadId: string;
  type: 'up-vote' | 'down-vote' | 'neutral-vote';
}

export interface VoteCommentProps {
  threadId: string;
  commentId: string;
  type: 'up-vote' | 'down-vote' | 'neutral-vote';
}

// Response vote thread
export interface RootVote {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  vote: Vote;
}

export interface Vote {
  id: string;
  userId: string;
  commentId: string;
  voteType: number;
}

// Initial vote thread
export interface VoteState {
  data: RootVote | null;
  isLoading: boolean;
  error: string | null;
}
