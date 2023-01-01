import { MongoClient } from 'mongodb';

export const mongoDbMockConnect = async () => {
    let connection;
    let db;
    const url = process.env.DB_CONNECTION_TEST || 'mongodb://0.0.0.0:27017/expenso-test';
    const dbName = process.env.DB_NAME_TEST || 'expenso-test';

    try {
        connection = await MongoClient.connect(url);
        db = await connection.db(dbName);
        console.log('Connected to mongo!');
    } catch (e) {
        console.error('BE database connection failed', e);
    }

    return {
        db,
        connection,
    };
};

export const after = async (connection: MongoClient): Promise<void> => {
    console.log(connection);
    try {
        await connection.close();
    } catch (e) {
        console.error(e);
    }
};
