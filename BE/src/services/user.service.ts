import { IUser } from "../models/user.interface";
import { IRepository } from "../repositories/mongo.repository";

export const registerUser = async (collection: IRepository<IUser>, entity: IUser): Promise<void> => {
  await collection.create(entity);
};

export const getUserById = async (collection: IRepository<IUser>, entity: IUser): Promise<IUser[] | null> => {
  if (entity.id) {
    return await collection.getById(entity.id);
  }

  return null;
}
