import { createSelector } from "@ngrx/store";
import { IAppState } from "../app.state";
import { ICategory } from "../categories/category.interface";

export const selectCategories = createSelector(
    (state: IAppState) => state.categories, 
    (categories: ICategory[]) => categories
);
