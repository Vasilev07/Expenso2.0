import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpendingsPage } from './spendings.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SpendingsPageRoutingModule } from './spendings-routing.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SpendingsPageRoutingModule,
  ],
  declarations: [SpendingsPage]
})
export class SpendingsPageModule {}
