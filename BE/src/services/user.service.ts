import { ObjectId } from 'mongodb';
import { IUser } from '../models/user.interface';
import { IRepository } from '../repositories/mongo.repository';

export const registerUser = async (collection: IRepository<IUser>, entity: IUser): Promise<void> => {
    await collection.create(entity);
};

export const findUserByEmail = async (collection: IRepository<IUser>, email: string): Promise<IUser[]> =>
    await collection.findBy({ email });

export const getUserById = async (collection: IRepository<IUser>, entity: IUser): Promise<IUser[] | null> => {
    if (entity._id) {
        return await collection.getById(entity._id);
    }

    return null;
};

export const updateUser = async (collection: IRepository<IUser>, userId: string, entity: any): Promise<IUser[]> =>
    await collection.updateMany({ _id: new ObjectId(userId) }, entity);

export const deleteAll = async (collection: IRepository<IUser>): Promise<void> => {
    await collection.deleteAll();
};
