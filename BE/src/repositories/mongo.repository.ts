import { Db } from "mongodb";

interface IRepository {
    create: (entity: any) => Promise<any>;
}

export const mongoRepository = <T>(db: Db, collectionName: string): IRepository => {

    const collection = db.collection(collectionName);

    const create = async(entity: T) => {
        collection.insertOne(entity);
    };

    return {
        create,
    }
};