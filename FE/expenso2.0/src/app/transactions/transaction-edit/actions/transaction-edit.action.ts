import { createAction, props } from '@ngrx/store';
import { ITransaction } from 'src/app/spendings/transactions/interfaces/transaction.interface';

export const editTransaction = createAction('[Transaction Edit] Edit Transaction',
    props<{ transaction: ITransaction, transactionId: string, currentTransactionId: string }>());
export const createTransactionSuccess = createAction('[Transaction Edit] Edit Transaction Success');
