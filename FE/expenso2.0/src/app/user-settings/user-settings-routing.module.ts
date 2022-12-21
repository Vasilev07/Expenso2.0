import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsPage } from './user-settings.page';

const routes: Routes = [{
    path: '',
    component: UserSettingsPage,
    pathMatch: 'full'
},
{
    path: 'currency',
    loadChildren: () => import('./currencies/currency.module').then(m => m.CurrencyModule),
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserSettingsRoutingModule {

}
