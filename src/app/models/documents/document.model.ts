export enum DocumentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export interface DocumentResponse {
  id: string;
  title: string;
  status: DocumentStatus;
  versionCount: number;
  createdAt: string;
}

export interface DocumentFilter {
  title?: string;
  status?: DocumentStatus;
  tag?: string;
}

export interface PageDocumentResponse {
  content: DocumentResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface DocumentUploadMetadata {
  title: string;
  description?: string;
  tags?: string[];
  ownerId?: string;
}
