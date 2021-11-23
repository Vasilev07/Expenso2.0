import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { registerWebPlugin } from '@capacitor/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/operators';
import { loginUser, loginUserWithFb } from './actions/app.action';
import { IFbUser } from './interfaces/user-fb.interface';
import { IUser } from './interfaces/user.interface';
import { ThemeService } from './services/theme.service';
import { UsersFbService } from './services/users-fb.service';
import { retrieveTransactions } from './spendings/transactions/actions/transaction.action';

registerWebPlugin(FacebookLogin as any);

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    public user$: Observable<unknown>;

    public user: IFbUser | IUser;
    public shouldShowSlides: boolean = true;
    public readonly slideOpts = {
        initialSlide: 1,
        speed: 400
    };
    public email: string;
    public password: string;
    public currency: string;

    public constructor(private readonly usersService: UsersFbService,
        private readonly router: Router,
        private readonly store: Store<{ user: unknown }>,
        private readonly themeService: ThemeService) {
        this.usersService.setupFbLogin();;
    }

    public ngOnInit() {
        this.user$ = this.store.select('user');

        this.user$.pipe(
            filter((user) => Object.keys(user).length > 0)
        ).subscribe((user) => {
            this.user = { ...user[0] };

            if ("darkMode" in this.user) {
                (this.user as IUser).darkMode ?
                    this.themeService.enableDarkMode() :
                    this.themeService.enableLightMode();
            }
        });

        this.store.dispatch(retrieveTransactions({ date: new Date().toISOString(), wholeYearSelected: false }));
    }

    public afterViewInit(): void {
        if (this.user) {
            this.router.navigate(['/expenso/spendings']);
        }
    }

    public onFbLogin(): void {
        this.store.dispatch(loginUserWithFb());

        this.router.navigate(['/expenso/spendings']);
    }

    public onLogin(): void {
        const user: IUser = { email: this.email, password: this.password, currency: this.currency };
        this.store.dispatch(loginUser({ user }));
    }
}
