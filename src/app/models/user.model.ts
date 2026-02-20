export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

export interface UserUpdateRequest {
  name: string;
  email: string;
  password: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
}
