import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPage } from './categories.page';
import { CategoryCreatePage } from './category-create/category-create.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CategoryCreatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesPageRoutingModule {}
