import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { IUserDetails } from "../interfaces/user.interface";
import { ThemeService } from "../services/theme.service";

@Component({
  templateUrl: './user-settings.page.html'
})
export class UserSettingsPage implements OnInit {
  public darkMode: boolean;

  constructor(private readonly store: Store<{user: IUserDetails}>,
              private readonly themeService: ThemeService) {
  }

  public ngOnInit(): void {
    this.store.select('user').subscribe((userDetail) => {
      this.darkMode = userDetail[0].darkMode;
    });
  }

  public onDarkModeChange(event): void {
    event ?
      this.themeService.enableDarkMode() :
      this.themeService.enableLightMode();
  }
}
