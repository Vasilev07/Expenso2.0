import { NextFunction } from "express";

export const init = (app: any): void => {
    app.get('/expense', (request: Request, response: any, next: NextFunction): void => {
        // response.send('Hello Georgi!');
        response.json('data');
    });
};