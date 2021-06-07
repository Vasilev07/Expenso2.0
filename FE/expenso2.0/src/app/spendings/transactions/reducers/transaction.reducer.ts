import { createReducer, on } from "@ngrx/store";
import { retrieveTransactionsSuccess } from "../actions/transaction.action";

export const initialState = [];

const _transactionReducer = createReducer(
    initialState,
    on(retrieveTransactionsSuccess, (state, { transactions }) => [...transactions]),
)

export const transactionReducer = (state, action) => {
    return _transactionReducer(state, action);
}
