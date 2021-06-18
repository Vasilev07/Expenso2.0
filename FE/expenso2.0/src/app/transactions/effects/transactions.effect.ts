import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { TransactionService } from "src/app/spendings/transactions/services/transaction.service";

@Injectable()
export class TransactionsEffects {

  constructor(private readonly actions$: Actions,
    private readonly transactionService: TransactionService) {
  }

  $retrieveTransactions = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Transaction] Retrieve Transactions'),
      switchMap(() => this.transactionService.getAllTransactions().pipe(
          map((transactions) => ({type: '[Transaction] Retrieve Transactions Success', transactions})),
          catchError(() => EMPTY)
      )
      )
    );
  });
}
