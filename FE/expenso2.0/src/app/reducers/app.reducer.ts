import { createReducer, on } from "@ngrx/store";
import { loginUserSuccess } from "../actions/app.action";

export const initialState = [];

const _userReducer = createReducer(
    initialState,
    on(loginUserSuccess, (state, { user }) => [...state, {...user}])
)

export const userReducer = (state, action) => {
    return _userReducer(state, action);
}
