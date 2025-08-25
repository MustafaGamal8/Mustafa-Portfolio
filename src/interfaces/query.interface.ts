export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface IncludeOptions {
  [key: string]: any;
}

export interface WhereOptions {
  [key: string]: any;
}

export interface OrderByOptions {
  [key: string]: 'asc' | 'desc';
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
