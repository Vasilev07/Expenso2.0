import { Db } from "mongodb";
import { ICategory } from "../models/category.interface";

export const createCategory = (db: Db, category: ICategory): void => {
    db.collection('category', )
};
