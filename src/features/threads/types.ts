// Threads state types

export interface ThreadsState {
  data: Thread[];
  error: string | null;
  isLoading: boolean;
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
