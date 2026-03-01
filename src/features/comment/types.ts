export interface CreateCommentInitial {
  data: RootCreateComment | null;
  isLoading: boolean;
  error: string | null;
}

export interface CreateCommentProps {
  id: string;
  content: CreateCommentPayload;
}

export interface CreateCommentPayload {
  content: string;
}

// Response create commen
export interface RootCreateComment {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  comment: Comment;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  upVotesBy: string[];
  downVotesBy: string[];
  owner: Owner;
}

export interface Owner {
  id: string;
  name: string;
  email: string;
}
