import { Db, ObjectId } from "mongodb";

export interface IRepository<T> {
    create: (entity: any) => Promise<any>;
    findAll: () => Promise<T[]>;
    deleteById: (id: string) => Promise<void>;
    getById: (id: string) => Promise<T[]>;
    deleteAll: () => Promise<any>;
    findBy: (criteria: any) => Promise<T[]>;
    findAllForUser: (userId: ObjectId) => Promise<T[]>;
    updateManyAddInArray: (criteria: any, toPushIn: string, entity: any) => Promise<void>;
    performAggregation: (aggregation: any) => Promise<any>;
    updateMany: (criteria: any, entity: T) => Promise<any>;
    updateManyArray: (criteria: any, toPushIn: string, entity: any) => Promise<void>;
    removeFromArray: (criteria: any, removeFrom: string, removedItemId: ObjectId) => Promise<any>;
}

export const mongoRepository = <T>(db: Db, collectionName: string): IRepository<T> => {

    const collection = db.collection(collectionName);

    const create = async (entity: T) => {
        collection.insertOne(entity);
    };

    const findAll = async (): Promise<T[]> => {
        return collection.find({}).toArray();
    };

    const deleteById = async (id: string): Promise<void> => {
        console.log('repo', new ObjectId(id));
        console.log('repo', id);

        collection.deleteOne({ _id: new ObjectId(id) });
    };

    const deleteAll = async () => {
        collection.deleteMany({});
    };

    const getById = async (id: string): Promise<T[]> => {
        return collection.find({ _id: new ObjectId(id) }).toArray();
    };

    const findBy = async (criteria: any): Promise<T[]> => {
        return collection.find({ ...criteria }).toArray();
    };

    const findAllForUser = async (userId: ObjectId): Promise<T[]> => {
        return collection.find({ userId }).toArray();
    };

    const updateManyAddInArray = async (criteria: any, toPushIn: string, entity: T): Promise<void> => {
        collection.updateMany({ ...criteria }, { $push: { [toPushIn]: entity } }, { upsert: true });
    };

    const updateManyArray = async (criteria: any, toUpdate: string, entity: T): Promise<void> => {
        collection.updateMany(
            {
                _id: new ObjectId(criteria.transactionId),
                [toUpdate]: { $elemMatch: { _id: new ObjectId(criteria.currentTransactionId) } }
            },
            {
                $set: {
                    [toUpdate + '.$']: { ...entity }
                }
            }
        );
    };

    const updateMany = async (criteria: any, entity: T): Promise<any> => {
        return collection.updateMany({ ...criteria }, { "$set": { ...entity } });
    };

    const performAggregation = async (aggregation: any): Promise<any> => {
        return collection.aggregate(aggregation).toArray();
    };

    const removeFromArray = async (criteria: any, removeFrom: string, removedItemId: ObjectId): Promise<any> => {
        return collection.updateMany(criteria, { $pull: { [removeFrom]: { _id: removedItemId } } })
    };

    return {
        create,
        findAll,
        deleteById,
        getById,
        findBy,
        findAllForUser,
        updateManyAddInArray,
        performAggregation,
        updateMany,
        updateManyArray,
        removeFromArray,
        deleteAll
    }
};
