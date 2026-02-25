import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse, UserResponse, UserUpdateRequest } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/accounts';

  listUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.API_URL);
  }

  createUser(userData: any): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.API_URL, userData);
  }

  updateUser(id: string, userData: UserUpdateRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.API_URL}/${id}`, userData);
  }
}
