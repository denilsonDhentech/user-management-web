import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
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
import { MessageService, MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../services/auth.service';
import { DocumentHistory } from '../document-history/document-history';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, InputTextModule, FormsModule, UserCreateDialog, TooltipModule, MenuModule, DocumentHistory],
  templateUrl: './document-list.html',
  styleUrl: './document-list.scss'
})
export class DocumentList implements OnInit {
  private documentService = inject(DocumentService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  public authService = inject(AuthService);

  selectedDoc: DocumentResponse | null = null;

  actionMenuItems: MenuItem[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;

  documents = signal<DocumentResponse[]>([]);
  totalRecords = signal(0);
  loading = signal(false);

  isCreateUserVisible = signal(false);
  isHistoryVisible = signal(false);

  rows = signal(10);

  filters = signal<DocumentFilter>({
    title: '',
    status: undefined
  });

  ngOnInit() {
    this.loadDocuments();
    this.initializeMenu();
  }

  initializeMenu() {
    this.actionMenuItems = [
      { label: 'Baixar', icon: 'pi pi-download', command: () => this.download(this.selectedDoc!) },
      { label: 'Nova Versão', icon: 'pi pi-upload', command: () => this.triggerFileUpload() },
      { label: 'Histórico', icon: 'pi pi-history', command: () => this.isHistoryVisible.set(true) },
      { separator: true },
      { label: 'Publicar', icon: 'pi pi-check-circle', command: () => this.updateStatus('PUBLISHED') },
      { label: 'Arquivar', icon: 'pi pi-box', command: () => this.updateStatus('ARCHIVED') }
    ];
  }

  prepareMenu(event: Event, menu: any, doc: DocumentResponse) {
    this.selectedDoc = doc;
    const isArchived = doc.status === DocumentStatus.ARCHIVED;
    const isPublished = doc.status === DocumentStatus.PUBLISHED;

    const canEdit = this.authService.isUser();

    this.actionMenuItems.forEach(item => {
      if (item.label === 'Baixar') {
        item.disabled = !canEdit;
      }
      if (item.label === 'Nova Versão') {
        item.disabled = !canEdit || isArchived;
      }
      if (item.label === 'Publicar') {
        item.disabled = !canEdit || isPublished || isArchived;
      }
      if (item.label === 'Arquivar') {
        item.disabled = !canEdit || isArchived;
      }
      if (item.label === 'Histórico') {
        item.disabled = false;
      }
    });

    menu.toggle(event);
  }

  loadDocuments(page: number = 0, size: number = this.rows()) {
    this.loading.set(true);
    this.rows.set(size);

    this.documentService.list(this.filters(), page, size).subscribe({
      next: (res) => {
        this.documents.set(res.content);
        this.totalRecords.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onPageChange(event: any) {
    const page = event.first / event.rows;
    const size = event.rows;
    this.loadDocuments(page, size);
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

  download(doc: DocumentResponse, versionNumber?: number) {
    const version = versionNumber ?? doc.versionCount;
    this.documentService.getDownloadUrl(doc.id, version).subscribe({
      next: (response) => {
        const downloadUrl = response['url'];
        if (downloadUrl) {
          window.open(downloadUrl, '_blank');

          this.messageService.add({
            severity: 'success',
            summary: 'Download',
            detail: `Iniciando download da versão v${version}`
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

  triggerFileUpload() {
    this.fileInput.nativeElement.click();
  }

  onNewVersionFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.selectedDoc) {
      this.loading.set(true);

      this.documentService.uploadNewVersion(this.selectedDoc.id, file).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Versão Atualizada',
            detail: `Nova versão do documento "${this.selectedDoc?.title}" enviada.`
          });
          this.loadDocuments();
          this.fileInput.nativeElement.value = '';
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao enviar nova versão.'
          });
          this.loading.set(false);
        }
      });
    }
  }

  updateStatus(newStatus: string) {
    if (!this.selectedDoc) return;
    this.loading.set(true);

    this.documentService.changeStatus(this.selectedDoc.id, newStatus).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Status Atualizado',
          detail: `Documento movido para ${newStatus}.`
        });
        this.loadDocuments();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao mudar status.' });
        this.loading.set(false);
      }
    });
  }

  downloadVersion(version: number) {
    if (this.selectedDoc) {
      this.download(this.selectedDoc, version);
    }
  }
}
