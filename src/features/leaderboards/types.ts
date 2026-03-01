export interface LeaderboardsState {
  data: RootLeaderboards | null;
  isLoading: boolean;
  error: string | null;
}

export interface RootLeaderboards {
  status: string;
  message: string;
  data: Leaderboards;
}

export interface Leaderboards {
  leaderboards: Leaderboard[];
}

export interface Leaderboard {
  user: User;
  score: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
