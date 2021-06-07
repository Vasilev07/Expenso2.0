import { createReducer, on } from "@ngrx/store";
import { retrieveTransactionsSucess } from "../actions/transactions.action";

export const initialState = [];

const _transactionsReducer = createReducer(
  initialState,
  on(retrieveTransactionsSucess, (state, { transactions }) => [...transactions]),
)

export const transactionsReducer = (state, action) => {
  return _transactionsReducer(state, action);
}
