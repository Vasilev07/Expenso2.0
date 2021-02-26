import { Db, ObjectId } from "mongodb";

export interface IRepository<T> {
    create: (entity: any) => Promise<any>;
    findAll: () => Promise<T[]>;
    deleteById: (id: string) => Promise<void>;
}

export const mongoRepository = <T>(db: Db, collectionName: string): IRepository<T> => {

    const collection = db.collection(collectionName);

    const create = async(entity: T) => {
        collection.insertOne(entity);
    };

    const findAll = async(): Promise<T[]> => {
        return collection.find({}).toArray();
    }

    const deleteById = async(id: string): Promise<void> => {
        collection.deleteOne({ _id: new ObjectId(id) });
    }

    return {
        create,
        findAll,
        deleteById
    }
};