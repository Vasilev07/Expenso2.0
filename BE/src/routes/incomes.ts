import { Request, Response } from 'express';
import { Db } from 'mongodb';
import { Statuses } from '../enums/status.enum';

export const init = (app: any, db: Db): void => {
    app.get('/income', (request: Request, response: Response, next: any): void => {
        // response.send('Hello Georgi!');
        response.status(Statuses.OK).send({ test: 'b' });
    });
};
