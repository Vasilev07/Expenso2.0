import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionEditPage } from './transaction-edit/transaction-edit.page';
import { TransactionsPage } from './transactions.page';

const routes: Routes = [
    {
        path: '',
        component: TransactionsPage,
        pathMatch: 'full'
    },
    {
        path: ':transactionId/edit/:currentTransactionId',
        component: TransactionEditPage,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionsPageRoutingModule {}
