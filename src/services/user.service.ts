import AXIOS from './axios';
import { IKycUserResponseParams, IKycUserResponse } from '@/types/user';

export function getKycUserList(payload: IKycUserResponseParams): Promise<IKycUserResponse> {
  return AXIOS.get(`kyc?page=${payload.page}&size=${payload.size}`);
}
