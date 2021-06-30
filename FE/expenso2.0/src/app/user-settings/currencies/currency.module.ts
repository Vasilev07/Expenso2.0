import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CurrencyRoutingModule } from "./currency-routing.module";
import { CurrencyPage } from "./currency.page";


@NgModule({
  imports: [
    CurrencyRoutingModule,
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  declarations: [CurrencyPage]
})
export class CurrencyModule {
}
