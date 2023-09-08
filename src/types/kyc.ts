import { UserTypes } from './user';

export enum EKycStatus {
  Approve = 'APPROVED'
}

export interface KycUserData {
  id: string;
  risk: string;
  status: EKycStatus;
  submittedAt: string;
  updatedAt: string;
  userId: string;
  user: UserTypes;
  page: number;
}
export interface IKycResponse {
  data: KycUserData[];
  size: number;
  totalElement: number;
  totalPages: number;
}

export interface IKycPayload {
  page?: number;
  size?: number;
}
