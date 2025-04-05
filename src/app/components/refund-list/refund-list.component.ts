import { Component, OnInit } from '@angular/core';
import { RefundService, Refund } from '../../services/refund.service';

@Component({
  selector: 'app-refund-list',
  templateUrl: './refund-list.component.html'
})
export class RefundListComponent implements OnInit {
  refunds: Refund[] = [];
  showModal: boolean = false;
  isUpdateMode: boolean = false;
  currentRefund: Refund = { amount: 0, status: 'PENDING', requestDate: '' };

  constructor(private refundService: RefundService) {}

  ngOnInit() {
    this.loadRefunds();
  }

  loadRefunds() {
    this.refundService.getRefunds().subscribe(data => this.refunds = data);
  }

  openAddModal() {
    this.isUpdateMode = false;
    this.currentRefund = { amount: 0, status: 'PENDING', requestDate: '' };
    this.showModal = true;
  }

  openUpdateModal(refund: Refund) {
    this.isUpdateMode = true;
    this.currentRefund = { ...refund };
    this.showModal = true;
  }

  saveRefund() {
    if (this.isUpdateMode && this.currentRefund.id != null) {
      this.refundService.updateRefund(this.currentRefund.id, this.currentRefund).subscribe(() => {
        this.loadRefunds();
        this.showModal = false;
      });
    } else {
      this.refundService.addRefund(this.currentRefund).subscribe(() => {
        this.loadRefunds();
        this.showModal = false;
      });
    }
  }

  deleteRefund(id: number) {
    this.refundService.deleteRefund(id).subscribe(() => {
      this.loadRefunds();
    });
  }
}
