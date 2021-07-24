import { mongoDbMockConnect } from "./db-mock";

describe('Name of the group', () => {
    let db: any;
    let connectuion: any;

    beforeEach(async () => {
        const mock = await mongoDbMockConnect();
        db = mock.db;
        connectuion = mock.connection;
    });

    afterAll(async () => {
        await db.connection.close();
        await db.close();
    });

    it('should ', () => {
        expect(true).toBe(true);
    });

    it('should ', async () => {
        const users = db.collection('users');

        const mockUser = { _id: 'some-user-id', name: 'John' };
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({ _id: 'some-user-id' });
        expect(insertedUser).toEqual(mockUser);
    });
});
