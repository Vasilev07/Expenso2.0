const { MongoClient } = require('mongodb');

const connect = async () => {
    console.log('on connect to DB');
    // console.log('whole env', process.env);
    console.log('DB', process.env.DB_CONNECTION);
    const url = process.env.DB_CONNECTION || 'mongodb+srv://expenso:expenso@expenso.cqezrzm.mongodb.net/?retryWrites=true&w=majority';
    const dbName = process.env.DB_NAME || 'expenso';

    const mongoClient = new MongoClient(url);
    await mongoClient.connect();

    console.log('Connected to mongo!');

    const db = mongoClient.db(dbName);
    console.log(db, 'db');
    return db;
};

export const initializeMongoStorage = () => ({
    getMongoClient: () => connect(),
});
