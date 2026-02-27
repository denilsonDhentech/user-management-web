import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../../models/accounts/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/api/accounts`;

  listUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.API_URL);
  }

  createUser(userData: any): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.API_URL, userData);
  }

  updateUser(id: string, userData: any): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.API_URL}/${id}`, userData);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
