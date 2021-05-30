import { createSelector } from "@ngrx/store";
import { IAppState } from "../app.state";
import { IUser } from "../interfaces/user-fb.interface";

export const selectUser = createSelector(
     (state: IAppState) => state.user,
     (user: IUser) => user
);
