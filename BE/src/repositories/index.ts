import { Db } from 'mongodb';
import { dbCollections } from '../configs/db-collections';
import { ICategory } from '../models/category.interface';
import { IRepository, mongoRepository } from './mongo.repository';

export interface ICollections {
    transactions: IRepository<any>;
    categories: IRepository<ICategory>;
    users: IRepository<any>;
}

export const initizalizeCollections = async (db: Db): Promise<ICollections> => {
    const collectionsToCreate = Object.entries(dbCollections);

    const dbData = await db.listCollections().toArray();

    collectionsToCreate.forEach(([collectionName, ...rest]) => {
        if (!dbData.some((data) => data.name === collectionName)) {
            db.createCollection(collectionName);
        }
    });

    return {
        transactions: mongoRepository<any>(db, 'transactions'),
        categories: mongoRepository<any>(db, 'categories'),
        users: mongoRepository<any>(db, 'users')
    }
};
