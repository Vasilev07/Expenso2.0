import { MongoClient } from 'mongodb';

const connect = async () => {
    const url = 'mongodb+srv://m001-student:m001-mongodb-basics@checklist.oegzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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
