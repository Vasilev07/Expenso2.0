import { NextFunction, Request, Response } from 'express';

import { Statuses } from '../enums/status.enum';

export const init = (app: any): void => {
    app.get('/expense', (request: Request, response: Response, next: NextFunction): void => {
        // response.send('Hello Georgi!');
        response.status(Statuses.OK).send({ test: 'a' });
    });
};
