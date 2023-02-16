declare interface BasicError {
  code: number
  description: string;
  error: string;
}

declare type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

declare type TPageable = {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

declare interface PaginationResponse<T = any> {
  first: boolean;
  last: boolean;
  empty: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  totalPages: number;
  totalElements: number;
  sort: Sort;
  pageable: TPageable;
  content: Array<T>;
}

declare type PaginationRequest<T = Record<string, any>> = {
  page?: number;
  size?: number;
} & Partial<T>;