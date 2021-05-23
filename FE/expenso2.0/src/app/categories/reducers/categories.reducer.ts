import { createReducer, on } from "@ngrx/store";
import { retrieveCategoryListSuccess } from "../actions/categories.action";

export const initialState = [];

const _categoriesReducer = createReducer(
    initialState,
    on(retrieveCategoryListSuccess, (state, { categories }) => [...state, ...categories])
)

export const categoriesReducer = (state, action) => {
    return _categoriesReducer(state, action);
}
