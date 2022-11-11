import { MongoClient } from 'mongodb';

export const mongoDbMockConnect = async () => {
    let connection;
    let db;

    connection = await MongoClient.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
    });
    db = await connection.db('test');

    return {
        db,
        connection
    }
};

export const after = async (db: any, collectionName: string) => {
    await db.connection.close();
    await db.close();
};
