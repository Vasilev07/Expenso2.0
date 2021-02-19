  
import express, { Application } from 'express';
import { expressInit } from './configs/expressConfig';
import { port } from './configs/index';
import { routesInit } from './routes';
import { initializeMongoStorage } from './configs/mongodbConfig';

export const startServer = async (): Promise<any> => {
    const server: Application = express();
    console.log('aiaiaiia');
    const mongoStorage = initializeMongoStorage();
    const mongoClient = await mongoStorage.getMongoClient();
    
    expressInit(server);
    routesInit(server, mongoClient);

    return server;
};
