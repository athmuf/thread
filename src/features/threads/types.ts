// Threads state types
export interface ThreadsState {
  data: Thread[];
  error: string | null;
  isLoading: boolean;
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
