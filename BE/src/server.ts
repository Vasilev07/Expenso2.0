import express, { Application } from 'express';

import { expressInit } from './configs/expressConfig';
import { routesInit } from './routes';
import { initializeMongoStorage } from './configs/mongodbConfig';
import { initizalizeCollections } from './repositories';

export const startServer = async (): Promise<any> => {
    const server: Application = express();
    const mongoStorage = initializeMongoStorage();
    const mongoClient = await mongoStorage.getMongoClient();

    expressInit(server);

    const collections = await initizalizeCollections(mongoClient);

    routesInit(server, collections);

    return server;
};
