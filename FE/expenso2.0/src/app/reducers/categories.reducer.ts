import { createReducer, on } from "@ngrx/store";
import { createCategory, retrieveCategoryList } from "../actions/categories.action";

export const initialState = [];

const _categoriesReducer = createReducer(
    initialState,
    on(retrieveCategoryList, (state, { Categories }) => [...state, ...Categories])
)

export const categoriesReducer = (state, action) => {
    return _categoriesReducer(state, action);
}