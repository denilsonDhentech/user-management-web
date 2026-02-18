// Representa o UserResponse que seu Java devolve
export interface UserResponse {
  id: string;   // O UUID do Java vira string no TS
  name: string;
  email: string;
}

// Representa a estrutura de paginação do Spring Data
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
