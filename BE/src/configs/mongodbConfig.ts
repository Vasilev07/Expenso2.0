import { MongoClient } from "mongodb";

export const connect = async() => {
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'expenso';

    // Create a new MongoClient
    const mongoClient = new MongoClient(url);

    // Use connect method to connect to the Server
    await mongoClient.connect();
    console.log('Connected to mongo!');

    const db = mongoClient.db(dbName);

    return db;
};

export const getMongoClient = async() => {
    return {
        getMongoClient: connect()
    };
}
