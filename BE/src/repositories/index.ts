import { Db } from 'mongodb';
import { dbCollections } from '../configs/db-collections';
import { IRepository, mongoRepository } from './mongo.repository';

export interface ICollections {
    transactions: IRepository<any>;
    categories: IRepository<any>;
    users: IRepository<any>;
}

export const initizalizeCollections = async (db: Db): Promise<any> => {
    const collectionsToCreate = Object.entries(dbCollections);

    const dbData = await db.listCollections().toArray();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    collectionsToCreate.forEach(([collectionName, ...rest]) => {
        if (!dbData.some((data: { name: string; }) => data.name === collectionName)) {
            db.createCollection(collectionName);
        }
    });

    return {
        transactions: mongoRepository<any>(db, 'transactions'),
        categories: mongoRepository<any>(db, 'categories'),
        users: mongoRepository<any>(db, 'users'),
    };
};
