import { createSelector } from "@ngrx/store";
import { IAppState } from "../app.state";
import { IFbUser } from "../interfaces/user-fb.interface";

export const selectUser = createSelector(
     (state: IAppState) => state.user,
     (user: IFbUser) => user
);
