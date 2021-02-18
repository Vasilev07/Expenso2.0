  
import express, { Application } from 'express';
import { expressInit } from './configs/expressConfig';
import { port } from './configs/index';
import { routesInit } from './routes';
import { getMongoClient } from './configs/mongodbConfig';

const app: Application = express();

expressInit(app);
routesInit(app);


getMongoClient().then();

console.log('heheh');
app.listen(port, () => console.log(`Listening on ${port}`));
