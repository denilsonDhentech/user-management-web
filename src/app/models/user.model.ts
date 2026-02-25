export interface UserResponse {
  id: string;
  name: string;
  username: string;
  role: string;
  active: boolean;
}

export interface UserUpdateRequest {
  name: string;
  username: string;
  password: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
