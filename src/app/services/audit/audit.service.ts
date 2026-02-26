import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLogResponse } from '../../models/audit/audit.model';
import { PageResponse } from '../../models/shared/page.model';
import { environment } from '../../../environments/environment.prod';


@Injectable({ providedIn: 'root' })
export class AuditService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/api/audit`;

  getLogs(page: number = 0, size: number = 20): Observable<PageResponse<AuditLogResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<AuditLogResponse>>(this.API_URL, { params });
  }

  getLogsByDocument(documentId: string): Observable<AuditLogResponse[]> {
    return this.http.get<AuditLogResponse[]>(`${this.API_URL}/document/${documentId}`);
  }
}
