import { createAction, props } from "@ngrx/store";
import { ITransaction } from "../transactions/interfaces/transaction.interface";

export const createTransaction = createAction('[Transaction] Add Transaction', props<{ transaction: ITransaction }>());
export const createTransactionSuccess = createAction('[Transaction] Add Transaction Success', props<{ transaction: ITransaction }>());
export const retrieveTransactions = createAction('[Transaction List] Add Transaction Success', props<{ transaction: ITransaction }>());
export const retrieveTransactionsSuccess = createAction('[Transaction List] Add Transaction Success', props<{ transactions: ITransaction[] }>());
