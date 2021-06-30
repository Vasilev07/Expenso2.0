import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { IUserDetails } from "../interfaces/user.interface";
import { ThemeService } from "../services/theme.service";
import { updateUserDetails } from "./actions/user-settings.action";

@Component({
  templateUrl: './user-settings.page.html'
})
export class UserSettingsPage implements OnInit {
  public darkMode: boolean;
  public userPrefferences: IUserDetails;

  constructor(private readonly store: Store<{user: IUserDetails}>,
              private readonly themeService: ThemeService,
              private readonly navCtrl: NavController) {
  }

  public ngOnInit(): void {
    this.store.select('user').subscribe((userDetail) => {
      this.userPrefferences = userDetail[0];
      this.darkMode = this.userPrefferences.darkMode;
    });
  }

  public onDarkModeChange(event): void {
    event ?
      this.enableDarkMode() :
      this.enableLightMode();
  }

  public enableDarkMode(): void {
    this.darkMode = true;
    this.themeService.enableDarkMode();
  }

  public enableLightMode(): void {
    this.darkMode = false;
    this.themeService.enableLightMode();
  }

  public onSaveClick(): void {
    console.log(this.darkMode);

    this.store.dispatch(updateUserDetails({users: [{ ...this.userPrefferences, darkMode: this.darkMode }]}));
  }

  public onCancelClick(): void {
    this.navCtrl.back();
  }
}
