import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorySelectorPage } from './category-selector/category-selector.page';
import { TransactionPage } from './transaction.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionPage,
    pathMatch: 'full'
  },
  {
    path: 'category-selector',
    component: CategorySelectorPage,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionPageRoutingModule {}
