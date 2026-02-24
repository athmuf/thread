// Users state types

export interface UsersState {
  data: User[];
  byId: Record<string, User>;
  error: string | null;
  isLoading: boolean;
}

// Fetch threads data API types

export interface RootUsers {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  users: User[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
