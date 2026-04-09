export type TApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export type TApiResponsePaginated = {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
};

export type TPaginatedData<K extends string, T> = {
  [P in K]: T[];
} & TApiResponsePaginated;

export type TPaginatedResponse<K extends string, T> = TApiResponse<
  TPaginatedData<K, T>
>;
