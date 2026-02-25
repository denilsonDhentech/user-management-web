import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PageDocumentResponse,
  DocumentResponse,
  DocumentFilter
} from '../../models/documents/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/documents';

  list(filter: DocumentFilter, page: number = 0, size: number = 10): Observable<PageDocumentResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filter.title) params = params.set('title', filter.title);
    if (filter.status) params = params.set('status', filter.status);
    if (filter.tag) params = params.set('tag', filter.tag);

    return this.http.get<PageDocumentResponse>(this.API_URL, { params });
  }

  create(formData: FormData): Observable<DocumentResponse> {
    return this.http.post<DocumentResponse>(this.API_URL, formData);
  }

  changeStatus(id: string, newStatus: string): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/status`, null, {
      params: { newStatus }
    });
  }

  getDownloadUrl(id: string, versionNumber: number): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(
      `${this.API_URL}/${id}/versions/${versionNumber}/download`
    );
  }
}
