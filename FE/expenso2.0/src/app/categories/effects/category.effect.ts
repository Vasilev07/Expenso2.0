import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CategoriesService } from "../services/categories.service";

@Injectable()
export class CategoryEffect {
  constructor(private readonly actions$: Actions,
    private readonly categoriesService: CategoriesService) { }

  loadCategories$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Categories List/API] Retrieve Categories'),
      mergeMap(() => this.categoriesService.getAll().pipe(
        map(categories => ({ type: '[Categories List/API] Retrieve Categories Success', categories })),
        catchError(() => EMPTY)
      )),
    );
  })

  createCategory$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Categories List] Add Category'),
      map((payload: any) => payload.category),
      mergeMap((category) =>
        this.categoriesService.addNew(category).pipe(
          map((category) => ({type: '[Categories List] Add Category Sucess', category}))
        ))
    )
  })
}
