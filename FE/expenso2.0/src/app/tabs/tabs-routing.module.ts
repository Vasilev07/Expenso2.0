import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'tabs/spendings',
        pathMatch: 'full'
    },
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'spendings',
                loadChildren: () => import('../spendings/spendings.module').then(m => m.SpendingsPageModule)
            },
            {
                path: 'categories',
                loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesPageModule)
            },
            {
                path: 'transactions',
                loadChildren: () => import('../transactions/transactions.module').then(m => m.TransactionsPageModule)
            },
            {
                path: 'statistics',
                loadChildren: () => import('../statistics/statistics.module').then(m => m.StatisticsPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {}
