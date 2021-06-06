import { Db, ObjectId } from "mongodb";

export interface IRepository<T> {
    create: (entity: any) => Promise<any>;
    findAll: () => Promise<T[]>;
    deleteById: (id: string) => Promise<void>;
    getById: (id: string) => Promise<T[]>;
    findBy: (criteria: any) => Promise<T[]>;
    findAllForUser: (userId: ObjectId) => Promise<T[]>;
    updateManyArray: (criteria: any, toPushIn: string, entity: any) => Promise<void>;
    performAggregation: (aggregation: any) => Promise<any>;
}

export const mongoRepository = <T>(db: Db, collectionName: string): IRepository<T> => {

    const collection = db.collection(collectionName);

    const create = async(entity: T) => {
        collection.insertOne(entity);
    };

    const findAll = async(): Promise<T[]> => {
        return collection.find({}).toArray();
    };

    const deleteById = async(id: string): Promise<void> => {
        collection.deleteOne({ _id: new ObjectId(id) });
    };

    const getById = async(id: string): Promise<T[]> => {
      return collection.find({ _id: new ObjectId(id) }).toArray();
    };

    const findBy = async(criteria: any): Promise<T[]> => {
      return collection.find({...criteria}).toArray();
    };

    const findAllForUser = async (userId: ObjectId): Promise<T[]> => {
      return collection.find({ userId }).toArray();
    };

    const updateManyArray = async (criteria: any, toPushIn: string, entity: T): Promise<void> => {
      collection.updateMany({ ...criteria }, { $push: { [toPushIn]: entity } },{ upsert: true });
    };

    const performAggregation = async (aggregation: any): Promise<any> => {
        return collection.aggregate(aggregation).toArray();
    };

    return {
        create,
        findAll,
        deleteById,
        getById,
        findBy,
        findAllForUser,
        updateManyArray,
        performAggregation
    }
};
