import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { EffectsModule } from "@ngrx/effects";
import { CategoriesPageModule } from "src/app/categories/categories.module";
import { ExploreContainerComponentModule } from "src/app/explore-container/explore-container.module";
import { CategorySelectorPage } from "./category-selector/category-selector.page";
import { TransactionEffects } from "./effects/transactions.effect";
import { TransactionPageRoutingModule } from "./transaction-routing.module";
import { TransactionPage } from "./transaction.page";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        TransactionPageRoutingModule,
        CategoriesPageModule,
        EffectsModule.forFeature([TransactionEffects]),
    ],
    declarations: [TransactionPage, CategorySelectorPage]
})
export class TransactionPageModule { }
