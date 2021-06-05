import { ICategory } from "./categories/category.interface";
import { IFbUser } from "./interfaces/user-fb.interface";

export interface IAppState {
    categories: ReadonlyArray<ICategory>;
    user: IFbUser;
    spendings: any;
}
