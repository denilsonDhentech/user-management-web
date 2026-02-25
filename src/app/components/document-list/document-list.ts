import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DocumentService } from '../../services/documents/document.service';
import { DocumentResponse, DocumentFilter, DocumentStatus } from '../../models/documents/document.model';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './document-list.html',
  styleUrl: './document-list.scss'
})
export class DocumentList implements OnInit {
  private documentService = inject(DocumentService);

  documents = signal<DocumentResponse[]>([]);
  totalRecords = signal(0);
  loading = signal(false);

  filters = signal<DocumentFilter>({
    title: '',
    status: undefined,
    tag: ''
  });

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments(page: number = 0) {
    this.loading.set(true);
    this.documentService.list(this.filters(), page).subscribe({
      next: (res) => {
        this.documents.set(res.content);
        this.totalRecords.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }


  getStatusSeverity(status: DocumentStatus) {
    switch (status) {
      case DocumentStatus.PUBLISHED: return 'success';
      case DocumentStatus.DRAFT: return 'secondary';
      case DocumentStatus.ARCHIVED: return 'danger';
      default: return 'info';
    }
  }
}
