import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpendingsPage } from './spendings.page';

const routes: Routes = [
    {
        path: '',
        component: SpendingsPage,
    },
    {
        path: 'transaction',
        loadChildren: () => import('./transactions/transaction.module').then(m => m.TransactionPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpendingsPageRoutingModule { }
