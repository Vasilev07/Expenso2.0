import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { UsersService } from "src/app/services/users.service";

@Injectable()
export class UserSettingsEffects {

  constructor(private readonly actions$: Actions,
    private readonly userService: UsersService) {
  }

  $updateUserSettings = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[User Details] Update User Details'),
      switchMap((userDetals) => this.userService.updateUserPreferences(userDetals).pipe(
        map(() => ({type: '[User Details] Update User Details Success'})),
        catchError(() => EMPTY)
      ))
    );
  });
}
