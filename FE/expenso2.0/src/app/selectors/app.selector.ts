import { createSelector } from "@ngrx/store";
import { IAppState } from "../app.state";
import { IUser } from "../interfaces/user.interface";

export const selectUser = createSelector(
     (state: IAppState) => state.user,
     (user: IUser) => user
);
