export interface LoginPayload {
  email: string;
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
  email: string;
  password: string;
  confirmPassword?: string;
}
