import { ICategory } from "../models/category.interface";
import { IRepository } from "../repositories/mongo.repository";

export const createCategory = async (collection: IRepository<ICategory>, entity: ICategory): Promise<void> => {
    await collection.create(entity);
};

export const getAllCategories = async(collection: IRepository<ICategory>) => { 
    return await collection.findAll();
};

export const deleteCategoryById = async(collection: IRepository<ICategory>, id: string) => {
    return await collection.deleteById(id);
}
