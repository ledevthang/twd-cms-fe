import { LoginPayload, LoginResponse } from '@/types/auth';
import AXIOS from './axios';

export function login(payload: LoginPayload): Promise<LoginResponse> {
  return AXIOS.post('/auth/signin', payload);
}
