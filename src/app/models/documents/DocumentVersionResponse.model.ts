export interface DocumentVersionResponse {
  versionNumber: number;
  fileKey: string;
  size: number;
  contentType: string;
  uploadedBy: string;
  uploadedAt: string;
  checksum: string;
}
