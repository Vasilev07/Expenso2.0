import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionEditPage } from './transaction-edit.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TransactionEditPageModule
  ],
  declarations: [TransactionEditPage]
})
export class TransactionEditPageModule {}
