import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyPage } from './currency.page';

const routes: Routes = [{
    path: '',
    component: CurrencyPage
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CurrencyRoutingModule {

}
