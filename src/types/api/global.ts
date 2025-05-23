export interface DeleteResponse {
  status: number;
  message: string;
}

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface UpdateResponse<T> {
  status: number;
  message: string;
  data: T;
}
