import AXIOS from './axios';
import { IKycPayload, IKycResponse } from '@/types/kyc';

export function getKycUserList(payload: IKycPayload): Promise<IKycResponse> {
  return AXIOS.get(`kyc?page=${payload.page}&size=${payload.size}`);
}
