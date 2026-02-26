export interface UserResponse {
  id: string;
  username: string;
  role: string;
  tenantId: string;
}

export interface UpdateAccountRequest{
  username: string;
  password: string;
  role: string;
  tenantId: string;
}
