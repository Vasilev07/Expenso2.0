import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserSettingsPage } from "./user-settings.page";

const routes: Routes = [{
  path: '',
  component: UserSettingsPage,
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSettingsRoutingModule {

}
