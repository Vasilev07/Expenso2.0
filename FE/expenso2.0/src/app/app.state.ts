import { ICategory } from "./categories/category.interface";

export interface IAppState {
    categories: ReadonlyArray<ICategory>;
}