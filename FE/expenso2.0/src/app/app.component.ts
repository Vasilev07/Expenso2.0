import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { registerWebPlugin } from '@capacitor/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/operators';
import { loginUser } from './actions/app.action';
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
  public readonly slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  public constructor(private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly store: Store<{ user: IUser }>,
    private readonly storage: Storage) {
      this.usersService.setupFbLogin();

      this.user$ = store.select('user');

      this.user$.pipe(
        filter((user) => Object.keys(user).length > 0)
      ).subscribe((user) => {
        this.user = { ...user[0] }
      });
  }

  public async ngOnInit() {
    await this.storage.create();
  }

  public onLogin(): void {
    this.store.dispatch(loginUser());

    this.router.navigate(['/tabs/spendings']);
  }
}
