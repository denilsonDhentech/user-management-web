import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { AuditService } from '../../services/audit/audit.service';
import { AuditLogResponse } from '../../models/audit/audit.model';

@Component({
  selector: 'app-audit-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    PopoverModule
  ],
  templateUrl: './audit-list.html'
})
export class AuditList implements OnInit {
  private auditService = inject(AuditService);

  logs = signal<AuditLogResponse[]>([]);
  totalRecords = signal(0);
  loading = signal(true);
  rows = signal(20);

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs(page: number = 0) {
    this.loading.set(true);
    this.auditService.getLogs(page, this.rows()).subscribe({
      next: (res) => {
        this.logs.set(res.content);
        this.totalRecords.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }


  getActionSeverity(action: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" {
    switch (action) {
      case 'DOCUMENT_CREATED': return 'success';
      case 'DOCUMENT_PUBLISHED': return 'info';
      case 'DOCUMENT_ARCHIVED': return 'danger';
      case 'FILE_DOWNLOADED': return 'warn'; 
      default: return 'secondary';
    }
  }

  formatMetadata(metadata: string) {
    try {
      return JSON.parse(metadata);
    } catch {
      return metadata;
    }
  }
}
