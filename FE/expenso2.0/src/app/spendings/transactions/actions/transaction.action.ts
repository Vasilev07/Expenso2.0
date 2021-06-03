import { createAction, props } from "@ngrx/store";
import { ITransaction } from "../interfaces/transaction.interface";

export const createTransaction = createAction('[Transaction] Add Transaction', props<{ transaction: ITransaction }>());
export const createTransactionSuccess = createAction('[Transaction] Add Transaction Success', props<{ transaction: ITransaction }>());
export const retrieveTransactionsSuccess = createAction('[Transaction List] Retrieve Transaction Success', props<{ transactions: ITransaction[] }>());
