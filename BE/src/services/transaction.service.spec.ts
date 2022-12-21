import { ObjectId } from 'mongodb';
import { after, mongoDbMockConnect } from '../db-mock';
import { mongoRepository } from '../repositories/mongo.repository';
import { deleteAll } from './category.service';
import { addExpense, addIncome, getAllTransactions } from './transaction.service';

describe('CategoryService', () => {
    let repository: any;

    beforeAll(async () => {
        const mock = await mongoDbMockConnect();
        repository = mongoRepository(mock.db, 'transactions');
    });

    afterEach(async () => {
        await deleteAll(repository);
    });

    afterAll(async () => {
        await after(repository);
    });

    describe('addExpense, addIncome, getAllTransactions', () => {
        it('should create passed category and getAllCategories should return it', async () => {
            const userId = new ObjectId();
            const expense = {
                _id: new ObjectId('60fd2c8c7ba7470b0ca6e1ab'),
                date: 'Sun Jul 25 2021 12:19:05 GMT+0300 (Eastern European Summer Time)',
                amount: 2,
                category: {
                    categoryId: new ObjectId('60b940d4f76f1130c8f19cea'),
                    name: 'Sport',
                    icon: 'american-football-outline',
                    color: '#e433b4',
                },
            };
            const income = {
                _id: new ObjectId('60fd2c8c7ba7470b0ca6e1ab'),
                date: 'Sun Jul 25 2021 12:19:05 GMT+0300 (Eastern European Summer Time)',
                amount: 2,
                category: {
                    categoryId: new ObjectId('60b940d4f76f1130c8f19cea'),
                    name: 'Sport',
                    icon: 'american-football-outline',
                    color: '#e433b4',
                },
            };
            await addExpense(repository, { userId, date: new Date().toString() }, expense);
            await addIncome(repository, { userId, date: new Date().toString() }, income);

            const transactions: any = await getAllTransactions(repository, {});

            expect(transactions).toHaveLength(1);
            expect(transactions[0].expenses).toHaveLength(1);
            expect(transactions[0].incomes).toHaveLength(1);
        });
    });
});
