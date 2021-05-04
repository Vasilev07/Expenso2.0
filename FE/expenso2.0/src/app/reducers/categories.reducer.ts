import { createReducer, on } from "@ngrx/store";
import { createCategory } from "../actions/categories.action";

export const initialState = [];

const _categoriesReducer = createReducer(
    initialState,
    on(createCategory, (state) => [...state])
)

export const categoriesReducer = (state, action) => {
    return _categoriesReducer(state, action);
}