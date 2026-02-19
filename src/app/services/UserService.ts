import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse, UserResponse, UserUpdateRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/users';

  listUsers(page: number = 0, size: number = 10): Observable<PageResponse<UserResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<UserResponse>>(this.API_URL, { params });
  }

  searchUsers(query: string, page: number = 0, size: number = 10): Observable<PageResponse<UserResponse>> {
    const params = new HttpParams()
      .set('search', query)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<UserResponse>>(`${this.API_URL}/search`, { params });
  }

  updateUser(id: string, userData: UserUpdateRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`/api/users/${id}`, userData);
  }
}
