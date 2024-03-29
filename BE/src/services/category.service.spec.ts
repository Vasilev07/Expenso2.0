import { ObjectId } from 'mongodb';
import { after, mongoDbMockConnect } from '../db-mock';
import { mongoRepository } from '../repositories/mongo.repository';
import {
    createCategory, deleteAll, deleteCategoryById, getAllCategories,
} from './category.service';

describe('CategoryService', () => {
    let repository: any;
    let connection: any;

    beforeAll(async () => {
        const mock = await mongoDbMockConnect() as any;
        repository = mongoRepository(mock.db, 'category');
        connection = mock.connection;
    });

    afterEach(async () => {
        await deleteAll(repository);
    });

    afterAll(async () => {
        await after(connection);
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
