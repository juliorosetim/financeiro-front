export class Pageable {
  page: number = 0;
  size: number = 10;
  sort?: string;
  direction?: string;
}

export interface PaginatedData<T> {
  content?: T[];
  totalPages?: number;
  totalElements?: number;
}

export interface Page<T> {
  data: Array<T>;
  pageable: Pageable;
  totalPages: number;
  totalElements?: number;
}

export class SearchTextPageable<T> implements Page<T> {
  text = "";
  data: T[] = [];
  page = 1;
  pageable: Pageable = {} as Pageable;
  totalPages = 0;
  itemsPerPage = 10;
  totalElements: number | undefined = 0;
}

export class EmptyPage<T> implements Page<T> {
  data: T[] = [];
  pageable: Pageable = {} as Pageable;
  totalPages: number = 0;
  totalElements: number | undefined = 0;
}

export type RemoteError = {
  message: string;
  code?: number;
};

export class Response<T> {
  content?: T;
  error?: RemoteError;
  get hasError(): boolean {
    return this.error !== undefined;
  }
}

export class DataResponse<T> {
  data?: { elementos: T; totalElementos: number; totalPages: number };
  error?: RemoteError;
  get hasError(): boolean {
    return this.error !== undefined;
  }
}
