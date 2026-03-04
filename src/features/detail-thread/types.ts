// Detail state types
export interface DetailThreadState {
  data: RootDetailThread | null;
  error: string | null;
  isLoading: boolean;
  voteData: VoteData;
}

export interface VoteData {
  totalUpVote: number;
  totalDownVote: number;
  totalComment: number;
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
  voteData: VoteData2;
}

export interface VoteData2 {
  totalUpVote: number;
  totalDownVote: number;
}

export interface Owner2 {
  id: string;
  name: string;
  avatar: string;
}

export interface RootDetailThreadApi {
  status: string;
  message: string;
  data: Data2;
}

export interface Data2 {
  detailThread: DetailThread2;
}

// Response pure api
export interface DetailThread2 {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  owner: Owner;
  upVotesBy: string[];
  downVotesBy: string[];
  comments: Comment2[];
}

export interface Comment2 {
  id: string;
  content: string;
  createdAt: string;
  owner: Owner2;
  upVotesBy: string[];
  downVotesBy: string[];
}
