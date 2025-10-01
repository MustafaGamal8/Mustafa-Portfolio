export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export type SortOrder = 'asc' | 'desc';

export interface IncludeOptions {
  [key: string]: any;
}

export interface WhereOptions {
  [key: string]: any;
}

export interface OrderByOptions {
  [key: string]: SortOrder;
}

export interface SelectOptions {
  [key: string]: boolean;
}

export interface IQueryOptions {
  pagination?: PaginationOptions;
  include?: IncludeOptions;
  where?: WhereOptions;
  orderBy?: OrderByOptions | OrderByOptions[];
  select?: SelectOptions;
  meta?: boolean | string;
  [key: string]: any;
}

export interface IQueryParams {
  [key: string]: any;
}

export interface QueryMeta {
  page?: number;
  limit?: number;
  total: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface QueryResult<T> {
  data: T[];
  meta: QueryMeta;
}
