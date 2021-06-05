import { createSelector } from "@ngrx/store";
import { IAppState } from "src/app/app.state";

export const selectSpendings = createSelector(
  (state: IAppState) => state.spendings,
  (spendings: any[]) => spendings
);
