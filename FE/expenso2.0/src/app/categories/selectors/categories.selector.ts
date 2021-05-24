import { createSelector } from "@ngrx/store";
import { IAppState } from "../../app.state";
import { ICategory } from "../category.interface";

export const selectCategories = createSelector(
    (state: IAppState) => state.categories,
    (categories: ICategory[]) => categories
);
