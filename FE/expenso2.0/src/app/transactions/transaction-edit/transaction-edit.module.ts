import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TransactionEditPageRoutingModule } from './transaction-edit-routing.module';
import { TransactionEditPage } from './transaction-edit.page';
import { EffectsModule } from '@ngrx/effects';
import { TransactionEditEffects } from './effects/transaction-edit.effect';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TransactionEditPageRoutingModule,
    EffectsModule.forFeature([TransactionEditEffects]),
  ],
  declarations: [TransactionEditPage],
  exports: [TransactionEditPage]
})
export class TransactionEditPageModule {}
