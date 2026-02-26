export interface AuditLogResponse {
  id: string;
  timestamp: string | Date;
  username: string;
  action: 'DOCUMENT_CREATED' | 'DOCUMENT_UPDATED' | 'DOCUMENT_PUBLISHED' | 'DOCUMENT_ARCHIVED' | 'FILE_UPLOADED' | 'FILE_DOWNLOADED';
  documentId: string;
  metadata: string; 
}
