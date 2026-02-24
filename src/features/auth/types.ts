// Auth state types

export interface AuthState {
  profile: User | null;
  isAuthenticated: boolean;
  register: Register;
}

export interface Register {
  isLoading: boolean;
  data: RootUserProfile | null;
}

// User data API

export interface RootUserProfile {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

// Register props

export interface RegisterProps {
  name: string;
  email: string;
  password: string;
}
