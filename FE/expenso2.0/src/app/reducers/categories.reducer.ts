import { createReducer, on } from "@ngrx/store";
import { retrieveCategoryList } from "../actions/categories.action";

export const initialState = [];

const _categoriesReducer = createReducer(
    initialState,
    on(retrieveCategoryList, (state, { categories }) => [...state, ...categories])
)

export const categoriesReducer = (state, action) => {
    return _categoriesReducer(state, action);
}