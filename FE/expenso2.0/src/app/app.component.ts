import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { registerWebPlugin } from '@capacitor/core';
import { Store } from '@ngrx/store';
import { loginUser } from './actions/app.action';
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
    private readonly router: Router,
    private readonly store: Store) {
    this.usersService.setupFbLogin();
  }

  public onLogin(): void {
    console.log('login should be dispached');

    this.store.dispatch(loginUser());
    // await this.usersService.login();
    this.shouldShow = false;
    this.router.navigate(['/tabs/spendings']);
  }
}
