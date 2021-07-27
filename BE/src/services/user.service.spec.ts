import { ObjectId } from "mongodb";
import { after, mongoDbMockConnect } from "../db-mock";
import { mongoRepository } from "../repositories/mongo.repository";
import { deleteAll, getUserById, registerUser } from "./user.service";

describe('CategoryService', () => {
    let db: any;
    let collectionName: string = 'users';
    let repository: any;

    beforeAll(async () => {
        const mock = await mongoDbMockConnect();
        db = mock.db;
        repository = mongoRepository(mock.db, 'users');
    });

    afterEach(async () => {
        await deleteAll(repository);
    });

    afterAll(async () => {
        await after(repository, collectionName);
    });

    describe('registerUser, getUserById', () => {
        it('should register user and then found it', async () => {
            const userId = new ObjectId();
            const user = {
                currency: 'BGN',
                _id: userId.toHexString(),
                name: 'GOSHO',
                password: 'GOSHO',
                email: 'GOSHO',
                darkMode: false,
            };

            await registerUser(repository, user);

            const foundUser = await getUserById(repository, user);

            if (foundUser) {
                expect(foundUser[0]).toStrictEqual(user);
            }
        });
    });
});


