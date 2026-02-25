// Auth state types
export interface AuthState {
  profile: User | null;
  isAuthenticated: boolean;
  register: Register;
  login: Login;
}

export interface Register {
  isLoading: boolean;
  data: RootUserProfile | null;
}

export interface Login {
  isLoading: boolean;
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

// login response type
export interface RootLogin {
  status: string;
  message: string;
  data: DataToken;
}

export interface DataToken {
  token: string;
}

// Login props
export interface LoginProps {
  email: string;
  password: string;
}
