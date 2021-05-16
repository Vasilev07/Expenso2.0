import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesPage } from './categories.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CategoriesPageRoutingModule } from './categories-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffect } from '../effects/category.effect';
import { CategoryCreatePage } from './category-create/category-create.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CategoriesPageRoutingModule,
    EffectsModule.forFeature([CategoryEffect])
  ],
  declarations: [CategoriesPage, CategoryCreatePage]
})
export class CategoriesPageModule {}
