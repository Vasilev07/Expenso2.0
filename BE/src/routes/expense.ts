import { NextFunction } from "express";
import { Request, Response } from "express";
import { Status } from "../enums/status.enum";

export const init = (app: any): void => {
    app.get('/expense', (request: Request, response: Response, next: NextFunction): void => {
        // response.send('Hello Georgi!');
        response.status(Status.OK).send({test: 'a'});
    });
};