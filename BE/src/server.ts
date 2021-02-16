  
import express, { Application } from 'express';
import { expressInit } from './configs/expressConfig';
import { port } from './configs/index';
import { routesInit } from './routes';

const app: Application = express();

expressInit(app);
routesInit(app);

app.listen(port, () => console.log(`Listening on ${port}`));