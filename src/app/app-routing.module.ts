import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefundListComponent } from './components/refund-list/refund-list.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContractComponent } from './components/refund-list/contrat/contrat.component';
const routes: Routes = [
  { path: '', redirectTo: 'refunds', pathMatch: 'full' },
  { path: 'refunds', component: RefundListComponent },
  { path: 'feedback', component: FeedbackComponent },
{path: 'contrat', component: ContractComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
