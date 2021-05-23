import { createAction, props } from "@ngrx/store";
import { IUser } from "../interfaces/user.interface";

export const loginUser = createAction('[User Login] Perform Login');
export const loginUserSuccess = createAction('[User Login Success] Performed Login Success', props<{ user: IUser }>());
