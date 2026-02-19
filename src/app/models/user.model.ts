export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
