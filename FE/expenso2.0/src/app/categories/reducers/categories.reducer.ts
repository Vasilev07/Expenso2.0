import { createReducer, on } from "@ngrx/store";
import { createCategorySuccess, retrieveCategoryListSuccess } from "../actions/categories.action";

export const initialState = [];

const _categoriesReducer = createReducer(
    initialState,
    on(retrieveCategoryListSuccess, (state, { categories }) => [...state, ...categories]),
    on(createCategorySuccess, (state, { category }) => [...state, {...category}])
)

export const categoriesReducer = (state, action) => {
    return _categoriesReducer(state, action);
}
