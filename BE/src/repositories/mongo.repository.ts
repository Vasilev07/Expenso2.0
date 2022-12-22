import { Db, ObjectId } from 'mongodb';

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
        await collection.insertOne(entity);
    };

    const findAll = async (): Promise<T[]> => await collection.find({}).toArray();

    const deleteById = async (id: string): Promise<void> => {
        await collection.deleteOne({ _id: new ObjectId(id) });
    };

    const deleteAll = async () => {
        await collection.deleteMany({});
    };

    const getById = async (id: string): Promise<T[]> => await collection.find({ _id: id }).toArray();

    const findBy = async (criteria: any): Promise<T[]> => await collection.find({ ...criteria }).toArray();

    const findAllForUser = async (userId: ObjectId): Promise<T[]> => await collection.find({ userId }).toArray();

    const updateManyAddInArray = async (criteria: any, toPushIn: string, entity: T): Promise<void> => {
        await collection.updateMany({ ...criteria }, { $push: { [toPushIn]: entity } }, { upsert: true });
    };

    const updateManyArray = async (criteria: any, toUpdate: string, entity: T): Promise<void> => {
        await collection.updateMany(
            {
                _id: new ObjectId(criteria.transactionId),
                [toUpdate]: { $elemMatch: { _id: new ObjectId(criteria.currentTransactionId) } },
            },
            {
                $set: {
                    [`${toUpdate}.$`]: { ...entity },
                },
            },
        );
    };

    const updateMany = async (criteria: any, entity: T): Promise<any> =>
        await collection.updateMany({ ...criteria }, { $set: { ...entity } });

    const performAggregation = async (aggregation: any): Promise<any> => await collection.aggregate(aggregation).toArray();

    const removeFromArray = async (criteria: any, removeFrom: string, removedItemId: ObjectId): Promise<any> =>
        await collection.updateMany(criteria, { $pull: { [removeFrom]: { _id: removedItemId } } });

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
        deleteAll,
    };
};
