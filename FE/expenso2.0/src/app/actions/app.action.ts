import { createAction, props } from "@ngrx/store";
import { IUser } from "../interfaces/user.interface";

export const loginUser = createAction('[User Login] Perform Login');
export const userLoggedIn = createAction('[User Login] Check If User Already Logged In');
export const loginUserSuccess = createAction('[User Login Success] Performed Login Success', props<{ user: IUser }>());
