import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {  exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { StorageService } from "../services/storage.service";
import { UsersService } from "../services/users.service";

@Injectable()
export class AppEffect {
  private token;

  constructor(private actions$: Actions,
    private readonly usersService: UsersService,
    private readonly http: HttpClient,
    private readonly storageService: StorageService) {
    }

  loadUser$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[User Login] Perform Login'),
      exhaustMap(() => this.usersService.login()),
      switchMap(() => this.http.get(this.usersService.url)
          .pipe(
            map((res: any) => ({id: res.id, name: res.name,pictureUrl: res.picture.data.url, birthday: res.birthday, email: res.email})),
            map((user) => ({ type: '[User Login Success] Performed Login Success', user }))
          )
      )
    );
  })

  userLoggedIn$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[User Login] Check If User Already Logged In'),
      exhaustMap(async () => await Promise.all([this.storageService.init()])),
      tap(console.log
        ),
      exhaustMap(async () => await this.storageService.get('fbToken')),
      tap((token) => this.token = token),
      tap(console.log
      ),
      exhaustMap(() => this.http.get(`https://graph.facebook.com/me?access_token=${this.token}`)),
      switchMap((user: any) => this.http.get(`https://graph.facebook.com/${user.id}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token}`)
          .pipe(
            map((res: any) => ({id: res.id, name: res.name,pictureUrl: res.picture.data.url, birthday: res.birthday, email: res.email})),
            map((user) => ({ type: '[User Login Success] Performed Login Success', user }))
          )
      )
    );
  })
}