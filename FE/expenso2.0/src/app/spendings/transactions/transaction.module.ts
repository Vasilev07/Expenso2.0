import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CategoriesPageModule } from "src/app/categories/categories.module";
import { ExploreContainerComponentModule } from "src/app/explore-container/explore-container.module";
import { CategorySelectorPage } from "./category-selector/category-selector.page";
import { TransactionPageRoutingModule } from "./transaction-routing.module";
import { TransactionPage } from "./transaction.page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TransactionPageRoutingModule,
    CategoriesPageModule
  ],
  declarations: [TransactionPage, CategorySelectorPage]
})
export class TransactionPageModule {}
