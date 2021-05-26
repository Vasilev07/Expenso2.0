import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPage } from './categories.page';
import { CategoryCreatePage } from './category-create/category-create.page';
import { CategoryIconCreatePage } from './category-create/category-icon-create/category-icon-create.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CategoryCreatePage,
  },
  {
    path: 'icon/create',
    component: CategoryIconCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesPageRoutingModule {}
