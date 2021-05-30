import { createAction, props } from "@ngrx/store";
import { IUser } from "../interfaces/user.interface";

export const loginUser = createAction('[User Login] Perform Login');
export const loginUserSuccess = createAction('[User Login Success] Performed Login Success', props<{ user: IUser }>());

export const loginUserWithFb = createAction('[User Login] Perform Login With FB');
export const userLoggedInWithFb = createAction('[User Login] Check If User Already Logged In With FB');
export const loginUserSuccessWithFB = createAction('[User Login Success] Performed Login With FB Success', props<{ user: IUser }>());
