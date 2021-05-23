import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { registerWebPlugin } from '@capacitor/core';
import { UsersService } from './services/users.service';

registerWebPlugin(FacebookLogin as any);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public shouldShow: boolean = true;
  public readonly slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  public constructor(private readonly usersService: UsersService,
    private readonly router: Router) {
    this.usersService.setupFbLogin();
  }

  public async onLogin(): Promise<void> {
    await this.usersService.login();
    this.shouldShow = false;
    this.router.navigate(['/tabs/spendings']);
  }
}
