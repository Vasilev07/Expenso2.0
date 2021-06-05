import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { TransactionService } from "../services/transaction.service";

@Injectable()
export class TransactionsEffects {

  constructor(private readonly actions$: Actions,
              private readonly transactionService: TransactionService) {
  }

  $createTransaction = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Transaction] Add Transaction'),
      switchMap((transactionAction: any) => this.transactionService.addNew(transactionAction.transaction).pipe(
        map((transaction) => ({type: '[Transaction] Add Transaction Success', transaction})),
        catchError(() => EMPTY)
      ))
    );
  });

  $retrieveExpences = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Transaction List] Retrieve Transaction Spendings'),
      switchMap(() => this.transactionService.getAll().pipe(
          map((transactions) => ({type: '[Transaction List] Retrieve Transaction Spendings Success', transactions})),
          catchError(() => EMPTY)
        )
      )
    );
  });
}
