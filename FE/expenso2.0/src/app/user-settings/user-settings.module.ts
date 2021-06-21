import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { UserSettingsRoutingModule } from "./user-settings-routing.module";
import { UserSettingsPage } from "./user-settings.page";

@NgModule({
  imports: [
    UserSettingsRoutingModule,
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [UserSettingsPage]
})
export class UserSettingsModule {
}
