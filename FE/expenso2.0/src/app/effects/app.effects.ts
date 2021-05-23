import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { forkJoin } from "rxjs/internal/observable/forkJoin";
import {  filter, map, mergeMap, switchMap } from "rxjs/operators";
import { UsersService } from "../services/users.service";

@Injectable()
export class AppEffect {
  constructor(private actions$: Actions,
    private readonly usersService: UsersService,
    private readonly http: HttpClient) { }

  loadUser$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[User Login] Perform Login'),
      switchMap(async () => {
        await this.usersService.login();

        return this.http.get(this.usersService.url)
          .pipe(
            map((res: any) => ({id: res.id, name: res.name,pictureUrl: res.picture.data.url, birthday: res.birthday, email: res.email})),
            map((user) => ({ type: '[User Login Success] Performed Login Success', user }))
          )
      })
    );
  })
}
