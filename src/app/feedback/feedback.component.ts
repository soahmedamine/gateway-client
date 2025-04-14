import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './feedback.service';




export interface Feedback {
  feedbackId?: number;
  submissionDate?: string;
  description: string;
}
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  currentFeedback: Feedback = { description: '' };
  modalTitle = 'Ajouter Feedback';
  isEdit = false;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbackService.getAllFeedbacks().subscribe(data => {
      this.feedbacks = data;

    });

    this.sortFeedbacks();}

  openAddModal() {
    this.modalTitle = 'Ajouter Feedback';
    this.isEdit = false;
    this.currentFeedback = { description: '' };
    (document.getElementById('feedbackModal') as any).style.display = 'block';
  }

  openEditModal(feedback: Feedback) {
    this.modalTitle = 'Modifier Feedback';
    this.isEdit = true;
    this.currentFeedback = { ...feedback };
    (document.getElementById('feedbackModal') as any).style.display = 'block';
  }

  closeModal() {
    (document.getElementById('feedbackModal') as any).style.display = 'none';
  }

  saveFeedback() {
    if (this.isEdit && this.currentFeedback.feedbackId) {
      this.feedbackService.updateFeedback(this.currentFeedback.feedbackId, this.currentFeedback).subscribe(() => {
        this.loadFeedbacks();
        this.closeModal();
      });
    } else {
      this.feedbackService.addFeedback(this.currentFeedback).subscribe(() => {
        this.loadFeedbacks();
        this.closeModal();
      });
    }
  }

  deleteFeedback(id: number | undefined) {
    if (id && confirm('Voulez-vous vraiment supprimer ce feedback ?')) {
      this.feedbackService.deleteFeedback(id).subscribe(() => {
        this.loadFeedbacks();
      });
    }
  }




  sortField: string = 'feedbackId';
sortDirection: 'asc' | 'desc' = 'asc';

sortBy(field: string) {
  if (this.sortField === field) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortField = field;
    this.sortDirection = 'asc';
  }
  this.sortFeedbacks();
}

sortFeedbacks() {
  this.feedbacks.sort((a: any, b: any) => {
    const valueA = a[this.sortField];
    const valueB = b[this.sortField];

    if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}

downloadPdfFile() {
  this.feedbackService.downloadFeedbackPdf().subscribe(blob => {
    const fileURL = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = fileURL;
    a.download = 'feedbacks.pdf';
    a.click();
    window.URL.revokeObjectURL(fileURL); // nettoyage mémoire
  });
}

}
