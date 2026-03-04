// Threads state types
export interface ThreadsState {
  data: Thread[];
  error: string | null;
  isLoading: boolean;
  selectedCategory: string;
  categories: string[];
}

export interface VoteData {
  totalUpVote: number;
  totalDownVote: number;
  totalComment: number;
}

// Create thread props
export interface CreateThreadProps {
  title: string;
  body: string;
  category: string;
}

// Fetch data API types
export interface RootThreads {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  threads: Thread[];
}

export interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
  voteData: VoteData;
}

// Response create thread data API types
export interface RootCreateThread {
  status: string;
  message: string;
  data: Data2;
}

export interface Data2 {
  thread: Thread;
}

// Response pure from API
export interface RootThreadsApi {
  status: string;
  message: string;
  data: Data3;
}

export interface Data3 {
  threads: Thread2[];
}

export interface Thread2 {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
}
