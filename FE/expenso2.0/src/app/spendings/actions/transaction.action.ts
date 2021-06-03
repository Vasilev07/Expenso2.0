import { createAction, props } from "@ngrx/store";
import { ITransaction } from "../transactions/interfaces/transaction.interface";

export const createTransaction = createAction('[Transaction List] Add Category', props<{ transaction: ITransaction }>());
export const createTransactionSuccess = createAction('[Transaction List] Add Category Success', props<{ transaction: ITransaction }>());
export const retrieveTransactions = createAction('[Transaction List] Add Category Success', props<{ transaction: ITransaction }>());
export const retrieveTransactionsSuccess = createAction('[Transaction List] Add Category Success', props<{ transactions: ITransaction[] }>());
