import { Component, input, output, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DocumentService } from '../../services/documents/document.service';
import { DocumentVersionResponse } from '../../models/documents/DocumentVersionResponse.model';

@Component({
  selector: 'app-document-history',
  standalone: true,
  imports: [CommonModule, DialogModule, TableModule, TagModule, ButtonModule, TooltipModule],
  templateUrl: './document-history.html'
})
export class DocumentHistory {
  private documentService = inject(DocumentService);

  visible = input.required<boolean>();
  documentId = input<string | null>(null);
  documentTitle = input<string>('');

  onClose = output<void>();
  onDownload = output<number>();

  versions = signal<DocumentVersionResponse[]>([]);
  loading = signal(false);

  constructor() {
    effect(() => {
      const id = this.documentId();
      if (this.visible() && id) {
        this.loadHistory(id);
      }
    });
  }

  private loadHistory(id: string) {
    this.loading.set(true);
    this.documentService.getVersionHistory(id).subscribe({
      next: (data) => {
        this.versions.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  close() {
    this.onClose.emit();
  }
}
