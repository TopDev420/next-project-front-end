export type Pagination<T = any> = {
  data: T[];
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
  total: number;
  lastPage: number;
  nextPageUrl: string | null;
  lastPageUrl: string | null;
};

export type PaginationInput<T = {}> = T & {
  page?: number;
};
