import { ObjectId } from 'mongodb';
import { after, mongoDbMockConnect } from '../db-mock';
import { mongoRepository } from '../repositories/mongo.repository';
import { deleteAll, getUserById, registerUser } from './user.service';

describe('UserService', () => {
    let repository: any;
    let connection: any;

    beforeAll(async () => {
        const mock = await mongoDbMockConnect() as any;
        repository = mongoRepository(mock.db, 'users');
        connection = mock.connection;
    });

    afterEach(async () => {
        await deleteAll(repository);
    });

    afterAll(async () => {
        await after(connection);
    });

    describe('registerUser, getUserById', () => {
        it('should register user and then found it', async () => {
            const user = {
                _id: new ObjectId().toHexString(),
                currency: 'BGN',
                name: 'GOSHO',
                password: 'GOSHO',
                email: 'GOSHO',
                darkMode: false,
            };

            try {
                await registerUser(repository, user);
            } catch (e) {
                console.log(e);
            }

            const foundUser = await getUserById(repository, user);

            if (foundUser) {
                expect(foundUser[0]).toStrictEqual(user);
            }
        });
    });
});
