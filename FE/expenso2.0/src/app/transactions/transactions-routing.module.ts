import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsPage } from './transactions.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionsPage,
    children: [
      {
        path: '/edit/:id',
        loadChildren: () => import('./transaction-edit/transaction-edit.module').then((m) => m.TransactionEditPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsPageRoutingModule { }
