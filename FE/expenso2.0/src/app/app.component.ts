import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { registerWebPlugin } from '@capacitor/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/operators';
import { loginUser, userLoggedIn } from './actions/app.action';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './services/users.service';
import { Storage } from '@ionic/storage';

registerWebPlugin(FacebookLogin as any);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public user$: Observable<IUser>;
  public user: IUser;
  public shouldShowSlides: boolean = true;
  public readonly slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  public constructor(private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly store: Store<{ user: IUser }>) {
      this.usersService.setupFbLogin();

      // this.store.dispatch(userLoggedIn());
  }

  public ngOnInit() {
    this.user$ = this.store.select('user');

    this.user$.pipe(
      filter((user) => Object.keys(user).length > 0)
    ).subscribe((user) => {
      this.user = { ...user[0] };
    });
  }

  public afterViewInit(): void {
    if (this.user) {
      this.router.navigate(['/expenso/spendings']);
    }
  }

  public onLogin(): void {
    this.store.dispatch(loginUser());

    this.router.navigate(['/expenso/spendings']);
  }
}
