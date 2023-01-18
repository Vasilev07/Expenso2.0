import { Request, Response } from 'express';

export const init = (app: any, collection: any): void => {
    app.get('/health', (request: Request, response: Response) => {
        console.log(collection);
        response.status(200).send('Ok');
    });
};
