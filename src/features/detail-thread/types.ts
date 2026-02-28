// Detail state types
export interface DetailThreadState {
  data: RootDetailThread | null;
  error: string | null;
  isLoading: boolean;
}

// Response detail thread types
export interface RootDetailThread {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  detailThread: DetailThread;
}

export interface DetailThread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  owner: Owner;
  upVotesBy: string[];
  downVotesBy: string[];
  comments: Comment[];
}

export interface Owner {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  owner: Owner2;
  upVotesBy: string[];
  downVotesBy: string[];
}

export interface Owner2 {
  id: string;
  name: string;
  avatar: string;
}
