import { ICategory } from "../models/category.interface";

export const createCategory = async (collection: any, entity: ICategory): Promise<void> => {
    await collection.create(entity);
};
