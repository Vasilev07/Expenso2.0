import { MongoClient } from 'mongodb';

const connect = async () => {
    const url = 'mongodb://localhost:27017';
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
