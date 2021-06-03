import { createReducer, on } from "@ngrx/store";
import { createTransactionSuccess } from "../actions/transaction.action";

export const initialState = [];

const _transactionsReducer = createReducer(
    initialState,
    on(createTransactionSuccess, (state, { transaction }) => [...state, { ...transaction }])
)

export const transactionsReducer = (state, action) => {
    return _transactionsReducer(state, action);
}
