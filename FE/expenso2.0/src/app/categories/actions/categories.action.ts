import { createAction, props } from "@ngrx/store";
import { ICategory } from "../category.interface";

export const createCategory = createAction('[Categories List] Add Category', props<{ category: ICategory }>());
export const createCategorySuccess = createAction('[Categories List] Add Category Sucess', props<{ category: ICategory }>());
export const deleteCategory = createAction('[Categories Collection] Remove Category');
export const retrieveCategoryList = createAction('[Categories List/API] Retrieve Categories');
export const retrieveCategoryListSuccess = createAction('[Categories List/API] Retrieve Categories Success', props<{ categories: ICategory[] }>());
