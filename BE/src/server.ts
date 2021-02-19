  
import express, { Application } from 'express';
import { expressInit } from './configs/expressConfig';
import { port } from './configs/index';
import { routesInit } from './routes';
import { initializeMongoStorage } from './configs/mongodbConfig';

const app: Application = express();

expressInit(app);
routesInit(app);

const mongoStorage = initializeMongoStorage();
const mongoClient = mongoStorage.getMongoClient().then().catch(console.error);

export const mongoDb = () => {
    return mongoClient;
}

app.listen(port, () => console.log(`Listening on ${port}`));
