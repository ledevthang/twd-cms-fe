export interface PaginationTypes {
  page: number;
  limit: number;
}

export interface Data<T> extends PaginationTypes {
  data: T[];
  total: number;
}
