import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { StatisticsPageRoutingModule } from "./statistics-routing.module";
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    StatisticsPageRoutingModule,
    Ng2GoogleChartsModule
  ],
  declarations: []
})
export class StatisticsPageModule {}
