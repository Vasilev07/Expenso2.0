import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ExploreContainerComponentModule } from "src/app/explore-container/explore-container.module";
import { TransactionPageRoutingModule } from "./transaction-routing.module";
import { TransactionPage } from "./transaction.page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TransactionPageRoutingModule
  ],
  declarations: [TransactionPage]
})
export class TransactionPageModule {}
