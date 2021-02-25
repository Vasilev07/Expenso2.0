import { Db } from 'mongodb';
import { dbCollections } from '../configs/db-collections';
import { ICategory } from '../models/category.interface';
import { IRepository, mongoRepository } from './mongo.repository';

export interface ICollections {
    categories: IRepository<ICategory>;
    expenses: IRepository<any>;
    incomes: IRepository<any>;
}

export const initizalizeCollections = async (db: Db): Promise<ICollections> => {
    const collectionsToCreate = Object.entries(dbCollections);

    const dbData = await db.listCollections().toArray();

    collectionsToCreate.forEach(([collectionName, ...rest]) => {
        if (!dbData.some((data) => data.name === collectionName)) {
            db.createCollection(collectionName);
            console.log(`Collection ${collectionName} created`);
        }
    });

    return {
        categories: mongoRepository<ICategory>(db, 'categories'),
        expenses: mongoRepository<any>(db, 'expenses'),
        incomes: mongoRepository<any>(db, 'incomes')
    }
};
