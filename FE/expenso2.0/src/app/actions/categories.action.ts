import { createAction, props } from "@ngrx/store";
import { ICategory } from "../categories/category.interface";

export const createCategory = createAction('[Categories List] Add Category', props<{ Category: ICategory }>());
export const deleteCategory = createAction('[Categories Collection] Remove Category');
export const retrieveCategoryList = createAction('[Categories List/API] Retrieve Categories Success', props<{ Categories: ICategory[] }>());