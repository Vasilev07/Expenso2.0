import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TransactionService } from '../services/transaction.service';

@Injectable()
export class TransactionEffects {

    constructor(private readonly actions$: Actions,
                private readonly transactionService: TransactionService) {
    }

    $createTransaction = createEffect((): any => {
        return this.actions$.pipe(
            ofType('[Transaction] Add Transaction'),
            switchMap((transactionAction: any) => this.transactionService.addNew(transactionAction.transaction).pipe(
                map(() => ({ type: '[Transaction] Add Transaction Success' })),
                catchError(() => EMPTY)
            )),
            switchMap(() => this.getAllTransactions(new Date().toISOString(), false))
        );
    });

    $retrieveExpences = createEffect((): any => {
        return this.actions$.pipe(
            ofType('[Transaction Spendings] Retrieve Transaction Spendings'),
            switchMap((data: { type: string, date: string, wholeYearSelected: boolean }) =>
                this.getAllTransactions(data.date, data.wholeYearSelected)
            )
        );
    });

    private getAllTransactions(date: string, wholeYearSelected: boolean) {
        return this.transactionService.getAllSpendings(date, wholeYearSelected).pipe(
            map((transactions) => ({ type: '[Transaction Spendings] Retrieve Transaction Spendings Success', transactions })),
            catchError(() => EMPTY)
        );
    }
}
