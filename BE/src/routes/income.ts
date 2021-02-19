import { Request, Response } from "express";
import { Db } from "mongodb";
import { Status } from "../enums/status.enum";

export const init = (app: any, db: Db): void => {
    app.get('/income', (request: Request, response: Response, next: any): void => {
        // response.send('Hello Georgi!');
        response.status(Status.OK).send({test: 'b'});
    });
};