import { ICategory } from "./categories/category.interface";
import { IUser } from "./interfaces/user-fb.interface";

export interface IAppState {
    categories: ReadonlyArray<ICategory>;
    user: IUser;
}
