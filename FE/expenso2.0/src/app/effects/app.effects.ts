import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { StorageService } from '../services/storage.service';
import { UsersFbService } from '../services/users-fb.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class AppEffect {
    private token;
    private baseUrl: string = `https://graph.facebook.com/`;

    constructor(private actions$: Actions,
                private readonly usersFbService: UsersFbService,
                private readonly usersService: UsersService,
                private readonly http: HttpClient,
                private readonly storageService: StorageService) {
    }

    loadUserWithFb$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType('[User Login] Perform Login With FB'),
            exhaustMap(() => this.usersFbService.login()),
            switchMap(() => this.http.get(this.usersFbService.url)
                .pipe(
                    map((res: any) => ({
                        id: res.id,
                        name: res.name,
                        pictureUrl: res.picture.data.url,
                        birthday: res.birthday,
                        email: res.email
                    })),
                    map((user) => ({ type: '[User Login Success] Performed Login With FB Success', user }))
                )
            )
        );
    });

    loadUser$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType('[User Login] Perform Login'),
            switchMap((userLoginType: any) => this.usersService.login(userLoginType.user)),
            tap((response) => this.usersService.storeToken(response.token)),
            switchMap(async(response) => {
                const user = {
                    email: response.user.email,
                    id: response.user.id,
                    darkMode: response.user.darkMode,
                    currency: response.user.currency
                };

                return ({ type: '[User Login Success] Performed Login Success', user });
            })
        );
    });

    // check if working
    userLoggedInWithFb$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType('[User Login] Check If User Already Logged In With FB'),
            exhaustMap(() => this.storageService.get('fbToken')),
            exhaustMap((token) => this.http.get(`https://graph.facebook.com/me?access_token=${ token }`)),
            switchMap((user: any) =>
                this.http.get(`${this.baseUrl}${ user.id }?fields=id,name,picture.width(720),birthday,email&access_token=${ this.token }`)
                    .pipe(
                        map((res: any) => ({
                            id: res.id,
                            name: res.name,
                            pictureUrl: res.picture.data.url,
                            birthday: res.birthday,
                            email: res.email
                        })),
                        map((user) => ({ type: '[User Login Success] Performed Login With FB Success', user }))
                    )
            )
        );
    });
}
