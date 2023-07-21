import { AxiosError } from 'axios';

interface ApiErrorData {
  message: string;
}

export interface ApiDataListType<T, A = any> {
  totalCount: number;
  totalPages: number;
  data: Array<T>;
  pageNumber: number;
  aggregation?: Array<A>;
  recordsPerpage: number;
}

export interface ApiError extends AxiosError {
  response?: {
    data?: ApiErrorData;
  };
}

export interface ApiRequestState {
  apiRequest: boolean;
  apiSuccess: boolean;
  apiFail: boolean;
}

export interface BulkDeleteParams {
  ids: string[];
}

export interface BulkDeleteResponse {
  id: string;
  rev: string;
  ok: boolean;
}
