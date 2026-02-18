import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponse, UserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
private http = inject(HttpClient);
  // A URL deve ser exatamente a do @RequestMapping do seu Java
  private readonly API_URL = '/api/users';

checkBackend(): Observable<PageResponse<UserResponse>> {
    const params = new HttpParams()
      .set('page', '0')
      .set('size', '10');

    return this.http.get<PageResponse<UserResponse>>(this.API_URL, { params });
  }

}
