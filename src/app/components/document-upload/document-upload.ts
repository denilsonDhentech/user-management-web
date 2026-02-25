import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { DocumentService } from '../../services/documents/document.service';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    ToastModule
  ],
  templateUrl: './document-upload.html',
  styleUrl: './document-upload.scss'
})
export class DocumentUpload {
  private documentService = inject(DocumentService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  title = signal('');
  description = signal('');
  tagsRaw = signal('');
  selectedFile = signal<File | null>(null);
  loading = signal(false);

  isTitleValid = computed(() => this.title().length >= 3 && this.title().length <= 150);
  isFormValid = computed(() => this.isTitleValid() && this.selectedFile() !== null);

  onFileSelect(event: any) {
    if (event.files && event.files.length > 0) {
      this.selectedFile.set(event.files[0]);
    }
  }

  save() {
    if (!this.isFormValid()) return;

    this.loading.set(true);
    const formData = new FormData();

    formData.append('title', this.title());
    formData.append('description', this.description());

    const tagsArray = this.tagsRaw().split(',').map(t => t.trim()).filter(t => t !== '');
    tagsArray.forEach(tag => formData.append('tags', tag));

    if (this.selectedFile()) {
      formData.append('file', this.selectedFile()!);
    }

this.documentService.create(formData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Documento enviado para o GED com sucesso!',
          life: 3000
        });

        setTimeout(() => {
          this.router.navigate(['/documents']);
          this.loading.set(false);
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro no Upload',
          detail: 'Não foi possível salvar o arquivo no S3. Verifique a conexão.',
          life: 5000
        });
        this.loading.set(false);
        console.error('Erro GED:', err);
      }
    });
  }
}
