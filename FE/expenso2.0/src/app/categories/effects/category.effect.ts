import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CategoriesService } from "../services/categories.service";

@Injectable()
export class CategoryEffect {
    constructor(private actions$: Actions,
                private categoriesService: CategoriesService) {}

    loadMovies$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType('[Categories List/API] Retrieve Categories Success'),
            mergeMap(() => this.categoriesService.getAll().pipe(
                map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
                catchError(() => EMPTY)
            )),
        );
    })
    
}