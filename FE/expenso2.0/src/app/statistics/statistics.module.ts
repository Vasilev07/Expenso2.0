import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StatisticsPageRoutingModule } from './statistics-routing.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { IonicModule } from '@ionic/angular';
import { StatisticsPage } from './statistics.page';

@NgModule({
    imports: [
        CommonModule,
        StatisticsPageRoutingModule,
        Ng2GoogleChartsModule,
        IonicModule
    ],
    declarations: [StatisticsPage]
})
export class StatisticsPageModule {}
