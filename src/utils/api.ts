import api from '../config/axios';
import {
  RootThreadsApi,
  RootCreateThread,
  CreateThreadProps,
} from '../features/threads/types';
import { RootUsers } from '../features/users/types';
import {
  RootUserProfile,
  RegisterProps,
  RootLogin,
  LoginProps,
} from '../features/auth/types';
import { RootDetailThreadApi } from '../features/detail-thread/types';
import {
  CreateCommentPayload,
  RootCreateComment,
} from '../features/comment/types';
import { RootVote, VoteCommentProps, VoteProps } from '../features/vote/types';
import { RootLeaderboards } from '../features/leaderboards/types';

export const fetchThreads = async (): Promise<RootThreadsApi> => {
  const res = await api.get<RootThreadsApi>('/threads');
  return res.data;
};

export const createThread = async (
  data: CreateThreadProps,
): Promise<RootCreateThread> => {
  const res = await api.post<RootCreateThread>('/threads', data);
  return res.data;
};

export const fetchDetailThread = async (
  id: string,
): Promise<RootDetailThreadApi> => {
  const res = await api.get<RootDetailThreadApi>(`/threads/${id}`);
  return res.data;
};

export const fetchUsers = async (): Promise<RootUsers> => {
  const res = await api.get<RootUsers>('/users');
  return res.data;
};

export const register = async (
  data: RegisterProps,
): Promise<RootUserProfile> => {
  const res = await api.post<RootUserProfile>('/register', data);
  return res.data;
};

export const login = async (data: LoginProps): Promise<RootLogin> => {
  const res = await api.post<RootLogin>('/login', data);
  return res.data;
};

export const getProfile = async (): Promise<RootUserProfile> => {
  const res = await api.get<RootUserProfile>('/users/me');
  return res.data;
};

export const createComment = async ({
  threadId,
  data,
}: {
  threadId: string;
  data: CreateCommentPayload;
}): Promise<RootCreateComment> => {
  const res = await api.post<RootCreateComment>(
    `/threads/${threadId}/comments`,
    data,
  );
  return res.data;
};

export const voteThread = async (payload: VoteProps): Promise<RootVote> => {
  const res = await api.post<RootVote>(
    `/threads/${payload.threadId}/${payload.type}`,
  );
  return res.data;
};

export const voteComment = async (
  payload: VoteCommentProps,
): Promise<RootVote> => {
  const res = await api.post<RootVote>(
    `/threads/${payload.threadId}/comments/${payload.commentId}/${payload.type}`,
  );
  return res.data;
};

export const fetchLeaderboards = async (
  signal?: AbortSignal,
): Promise<RootLeaderboards> => {
  const res = await api.get<RootLeaderboards>('/leaderboards', { signal });
  return res.data;
};
