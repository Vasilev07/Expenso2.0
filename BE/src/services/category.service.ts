import { ObjectId } from "mongodb";
import { ICategory } from "../models/category.interface";
import { IRepository } from "../repositories/mongo.repository";

export const createCategory = async (collection: IRepository<ICategory>, entity: ICategory): Promise<void> => {
    await collection.create(entity);
};

export const getAllCategories = async (collection: IRepository<ICategory>, userId: ObjectId) => {
    return await collection.findAllForUser(userId);
};

export const deleteCategoryById = async (collection: IRepository<ICategory>, id: string) => {
    return await collection.deleteById(id);
};

export const deleteAll = async (collection: IRepository<ICategory>) => {
    return await collection.deleteAll();
};
