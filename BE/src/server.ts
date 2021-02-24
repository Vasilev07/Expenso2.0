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
    routesInit(server, mongoClient);
    // put that on the row above and pass it to routes in order routes to be 
    // responsible to pass the right repository to the right route which by itself
    // should pass it to the service :)
    await initizalizeCollections(mongoClient);

    return server;
};
