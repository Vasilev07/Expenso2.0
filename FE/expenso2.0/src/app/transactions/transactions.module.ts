import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionsPage } from './transactions.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TransactionsPageRoutingModule } from './transactions-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { TransactionsEffects } from './effects/transactions.effect';
import { TransactionEditPageModule } from './transaction-edit/transaction-edit.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        TransactionsPageRoutingModule,
        TransactionEditPageModule,
        EffectsModule.forFeature([TransactionsEffects])
    ],
    declarations: [TransactionsPage]
})
export class TransactionsPageModule {}
