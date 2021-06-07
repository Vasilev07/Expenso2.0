import { createSelector } from "@ngrx/store";
import { IAppState } from "src/app/app.state";

export const selectTransactions = createSelector(
  (state: IAppState) => state.transactions,
  (transactions: any[]) => transactions
);
