import { ObjectId } from 'mongodb';
import { after, mongoDbMockConnect } from '../db-mock';
import { mongoRepository } from '../repositories/mongo.repository';
import {
    createCategory, deleteAll, deleteCategoryById, getAllCategories,
} from './category.service';

describe('CategoryService', () => {
    let db: any;
    const collectionName: string = 'category';
    let repository: any;

    beforeAll(async () => {
        const mock = await mongoDbMockConnect();
        db = mock.db;
        repository = mongoRepository(mock.db, 'category');
    });

    afterEach(async () => {
        await deleteAll(repository);
    });

    afterAll(async () => {
        await after(repository, collectionName);
    });

    describe('createCategory', () => {
        it('should create passed category and getAllCategories should return it', async () => {
            const id = new ObjectId();
            const userId = new ObjectId();
            const instertedCategory = {
                _id: id,
                name: 'string',
                color: 'string',
                icon: 'string',
                userId,
                isExpense: true,
            };

            await createCategory(repository, instertedCategory);

            const foundCategories = await getAllCategories(repository, userId);

            expect(foundCategories).toStrictEqual([instertedCategory]);
        });
    });

    describe('deleteCategoryById', () => {
        it('should create passed category and getAllCategories should return it and delete should remove it', async () => {
            const id = new ObjectId();
            const userId = new ObjectId();
            const instertedCategory = {
                _id: id,
                name: 'string',
                color: 'string',
                icon: 'string',
                userId,
                isExpense: true,
            };

            await createCategory(repository, instertedCategory);

            const foundCategories = await getAllCategories(repository, userId);

            expect(foundCategories).toStrictEqual([instertedCategory]);

            await deleteCategoryById(repository, id.toHexString());

            const foundCategoriesAfterDetele = await getAllCategories(repository, userId);

            expect(foundCategoriesAfterDetele).toHaveLength(0);
        });
    });
});
