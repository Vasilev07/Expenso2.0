import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { IUserDetails } from "../interfaces/user.interface";
import { ThemeService } from "../services/theme.service";
import { updateUserDetails } from "./actions/user-settings.action";
import { UserSettingsService } from "./services/user-settings.service";

@Component({
  templateUrl: './user-settings.page.html'
})
export class UserSettingsPage implements OnInit {
  public darkMode: boolean;
  public userPrefferences: IUserDetails;
  public currency;

  constructor(private readonly store: Store<{user: IUserDetails}>,
              private readonly themeService: ThemeService,
              private readonly navCtrl: NavController,
              private readonly router: Router,
              private readonly usersSettingsService: UserSettingsService) {
  }

  public ngOnInit(): void {
    this.store.select('user').subscribe((userDetail) => {
      this.userPrefferences = userDetail[0];
      this.darkMode = this.userPrefferences.darkMode;
    });

    this.usersSettingsService.settings.subscribe((currency) => {
      if (currency) {
        this.currency = currency.currency;
      }
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
    this.store.dispatch(updateUserDetails({users: [{ ...this.userPrefferences, darkMode: this.darkMode, currency: this.currency }]}));

    this.onCancelClick();
  }

  public onCancelClick(): void {
    this.navCtrl.back();
  }

  public onCurrencySelect(): void {
    this.router.navigate(['/user-settings/currency']);
  }
}
