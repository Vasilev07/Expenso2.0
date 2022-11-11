import { createAction, props } from '@ngrx/store';
import { ITransaction } from 'src/app/spendings/transactions/interfaces/transaction.interface';

export const retrieveTransactions = createAction('[Transaction] Retrieve Transactions');
export const retrieveTransactionsSucess = createAction('[Transaction] Retrieve Transactions Success',
    props<{ transactions: ITransaction[] }>());
export const deleteTransaction = createAction('[Transaction] Delete Transactions', props<{ transaction: ITransaction }>());
