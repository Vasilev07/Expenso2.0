import { MongoClient } from 'mongodb';

const connect = async () => {
    console.log('whole env', process.env);
    console.log('DB', process.env.DB_CONNECTION);
    const url = process.env.DB_CONNECTION || 'mongodb://0.0.0.0:27017/expenso2.0';
    const dbName = 'expenso';

    const mongoClient = new MongoClient(url);
    await mongoClient.connect();

    console.log('Connected to mongo!');

    const db = mongoClient.db(dbName);

    return db;
};

export const initializeMongoStorage = () => ({
    getMongoClient: () => connect(),
});
