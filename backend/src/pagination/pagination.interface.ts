export interface IPagination<T> {
  data: T[];
  pagination: {
    current?: number;
    previous?: number | null;
    next?: number | null;
    total?: number;
  };
}

export interface IPaginationOptions {
  page?: number;
  limit?: number | null;
  order?: any;
  where?: object;
  q?: string;
  populate?: string | string[];
}
