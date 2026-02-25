import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DocumentService } from '../../services/documents/document.service';
import { DocumentResponse, DocumentFilter, DocumentStatus } from '../../models/documents/document.model';
import { UserCreateDialog } from '../user-create-dialog/user-create-dialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, InputTextModule, FormsModule, UserCreateDialog, TooltipModule],
  templateUrl: './document-list.html',
  styleUrl: './document-list.scss'
})
export class DocumentList implements OnInit {
  private documentService = inject(DocumentService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  documents = signal<DocumentResponse[]>([]);
  totalRecords = signal(0);
  loading = signal(false);

  isCreateUserVisible = signal(false);

  filters = signal<DocumentFilter>({
    title: '',
    status: undefined
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

  openUserCreate() {
    this.isCreateUserVisible.set(true);
  }

  goToUpload() {
    this.router.navigate(['/documents/upload']);
  }

  download(doc: DocumentResponse) {
    this.documentService.getDownloadUrl(doc.id, doc.versionCount).subscribe({
      next: (response) => {
        const downloadUrl = response['url'];
        if (downloadUrl) {
          window.open(downloadUrl, '_blank');

          this.messageService.add({
            severity: 'success',
            summary: 'Download',
            detail: 'Iniciando download do documento...'
          });
        }
      },
      error: (err) => {
        console.error('Erro ao obter URL de download:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível gerar a URL de download.'
        });
      }
    });
  }
}
