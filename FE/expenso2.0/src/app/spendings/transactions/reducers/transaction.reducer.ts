import { createReducer, on } from "@ngrx/store";
import { retrieveTransactionsSuccess } from "../actions/transaction.action";

export const initialState = [];

const _transactionsReducer = createReducer(
    initialState,
    on(retrieveTransactionsSuccess, (state, { transactions }) => [...transactions]),
)

export const transactionsReducer = (state, action) => {
    return _transactionsReducer(state, action);
}
