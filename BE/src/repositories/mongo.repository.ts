import { Db } from "mongodb";

export interface IRepository<T> {
    create: (entity: any) => Promise<any>;
    findAll: () => Promise<T[]>;
}

export const mongoRepository = <T>(db: Db, collectionName: string): IRepository<T> => {

    const collection = db.collection(collectionName);

    const create = async(entity: T) => {
        collection.insertOne(entity);
    };

    const findAll = async(): Promise<T[]> => {
        return collection.find({}).toArray();
    }

    return {
        create,
        findAll,
    }
};