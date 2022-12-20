import { MongoClient } from 'mongodb';

export const mongoDbMockConnect = async () => {
    let connection;
    let db;

    // eslint-disable-next-line prefer-const
    connection = await MongoClient.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
    });
    // eslint-disable-next-line prefer-const
    db = await connection.db('test');

    return {
        db,
        connection,
    };
};

export const after = async (db: any) => {
    await db.connection.close();
    await db.close();
};
