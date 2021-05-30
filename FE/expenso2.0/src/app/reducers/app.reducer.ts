import { createReducer, on } from "@ngrx/store";
import { loginUserSuccessWithFB } from "../actions/app.action";

export const initialState = [];

const _userReducer = createReducer(
    initialState,
    on(loginUserSuccessWithFB, (state, { user }) => [...state, {...user}])
)

export const userReducer = (state, action) => {
    return _userReducer(state, action);
}
