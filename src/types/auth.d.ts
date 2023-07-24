export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  status: boolean;
  loading?: boolean;
}

export interface LoginFormTypes {
  username: string;
  password: string;
  confirmPassword?: string;
}
