import { createAction, props } from "@ngrx/store";
import { IUserDetails } from "src/app/interfaces/user.interface";

export const updateUserDetails = createAction('[User Details] Update User Details', props<{ users: IUserDetails[] }>());
export const updateUserDetailsSuccess = createAction('[User Details] Update User Details Success', props<{ users: IUserDetails[] }>());
