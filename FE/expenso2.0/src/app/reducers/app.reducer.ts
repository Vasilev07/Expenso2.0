import { createReducer, on } from "@ngrx/store";
import { loginUserSuccess, loginUserSuccessWithFB } from "../actions/app.action";

export const initialState = [];

const _userReducer = createReducer(
    initialState,
    on(loginUserSuccessWithFB, (state, { user }) => [...state, {...user}]),
    on(loginUserSuccess, (state, { user }) => [...state, {...user}])
)

export const userReducer = (state, action) => {
    return _userReducer(state, action);
}
