import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { ITransaction } from "src/app/spendings/transactions/interfaces/transaction.interface";
import { TransactionService } from "src/app/spendings/transactions/services/transaction.service";

@Injectable()
export class TransactionEditEffects {

  constructor(private readonly actions$: Actions,
              private readonly transactionService: TransactionService) {
  }

  $createTransaction = createEffect((): any => {
    return this.actions$.pipe(
      ofType('[Transaction Edit] Edit Transaction'),
      switchMap((transactionAction: { transaction: ITransaction, transactionId: string, currentTransactionId: string }) =>
        this.transactionService.edit(transactionAction.transaction, transactionAction.transactionId, transactionAction.currentTransactionId).pipe(
          tap(console.log),
          map(() => ({type: '[Transaction] Retrieve Transactions'})),
          catchError(() => EMPTY)
      ))
    );
  });
}
