import { NgModule } from "@angular/core";
import { UserSettingsRoutingModule } from "./user-settings-routing.module";
import { UserSettingsPage } from "./user-settings.page";

@NgModule({
  imports: [UserSettingsRoutingModule],
  declarations: [UserSettingsPage]
})
export class UserSettingsModule {
}
