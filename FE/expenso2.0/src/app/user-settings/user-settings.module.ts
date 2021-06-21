import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { EffectsModule } from "@ngrx/effects";
import { UserSettingsEffects } from "./effects/user-settings.effect";
import { UserSettingsRoutingModule } from "./user-settings-routing.module";
import { UserSettingsPage } from "./user-settings.page";

@NgModule({
  imports: [
    UserSettingsRoutingModule,
    CommonModule,
    IonicModule,
    FormsModule,
    EffectsModule.forFeature([UserSettingsEffects])
  ],
  declarations: [UserSettingsPage]
})
export class UserSettingsModule {
}
