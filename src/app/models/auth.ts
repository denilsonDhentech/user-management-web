export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  tenantId: string;
}

export interface AuthResponse {
  token: string;
}
