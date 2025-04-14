import { Component, OnInit } from '@angular/core';
import { Contract, ContractService } from './contrat.service';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContractComponent implements OnInit {
  contracts: Contract[] = [];
  currentContract: Contract = this.resetContract();
  modalTitle = 'Ajouter un contrat';
  isEdit = false;

  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts() {
    this.contractService.getAll().subscribe({
      next: (data) => this.contracts = data,
      error: (err) => console.error('Erreur lors du chargement des contrats:', err)
    });
  }

  openAddModal() {
    this.modalTitle = 'Ajouter un contrat';
    this.isEdit = false;
    this.currentContract = this.resetContract();
    this.showModal();
  }

  openEditModal(contract: Contract) {
    this.modalTitle = 'Modifier un contrat';
    this.isEdit = true;
    this.currentContract = { ...contract };
    this.showModal();
  }

  save() {
    if (this.isEdit && this.currentContract.idContrat) {
      this.contractService.update(this.currentContract.idContrat, this.currentContract).subscribe(() => {
        this.loadContracts();
        this.hideModal();
      });
    } else {
      this.contractService.add(this.currentContract).subscribe(() => {
        this.loadContracts();
        this.hideModal();
      });
    }
  }

  delete(id: number) {
    if (confirm('Confirmer la suppression ?')) {
      this.contractService.delete(id).subscribe(() => this.loadContracts());
    }
  }

  resetContract(): Contract {
    return {
      number: '',
      startDate: '',
      endDate: '',
      status: 'ONGOING',
      clientEmail: ''
    };
  }

  showModal() {
    (document.getElementById('contractModal') as any).style.display = 'block';
  }

  hideModal() {
    (document.getElementById('contractModal') as any).style.display = 'none';
  }
}