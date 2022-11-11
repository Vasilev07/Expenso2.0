import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionEditPage } from './transaction-edit.page';

const routes: Routes = [
    {
        path: '',
        component: TransactionEditPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionEditPageRoutingModule {}
