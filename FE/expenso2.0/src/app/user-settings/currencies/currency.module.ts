import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CurrencySymbolPipe } from 'src/app/user-settings/currency.pipe';
import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyPage } from './currency.page';

@NgModule({
    imports: [
        CurrencyRoutingModule,
        CommonModule,
        IonicModule,
        FormsModule
    ],
    declarations: [CurrencyPage, CurrencySymbolPipe]
})
export class CurrencyModule {
}
