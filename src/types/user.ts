export interface UserTypes {
  id: string;
  email: string;
  displayName: string;
  role: string;
  avatarPicture: string;
  phoneNumber: string;
}

export enum EKycStatus {
  Approve = 'APPROVED'
}

export interface KycUser {
  id: string;
  risk: string;
  status: EKycStatus;
  submittedAt: Date;
  updatedAt: Date;
  userId: string;
  user: UserTypes;
  page: number;
}
export interface IKycUserResponse {
  data: KycUser[];
  size: number;
  totalElement: number;
  totalPages: number;
}

export interface IKycUserResponseParams {
  page?: number;
  size?: number;
}
