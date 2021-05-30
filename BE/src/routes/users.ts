import { hash } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import { Statuses } from '../enums/status.enum';
import { IUser } from '../models/user.interface';
import { findUserByEmail, registerUser } from '../services/user.service';

export const init = (app: any, collection: any): void => {
  app.post('/signup', async(request: Request, response: Response, next: NextFunction): Promise<void> => {
    const isEmailAvailable = await findUserByEmail(collection, request.body.email);

    if (isEmailAvailable.length > 0) {
      response.send(409).send({error: 'Email already in use'});
    }

    const password = await hash(request.body.password, 10);

    const user: IUser = {
      email: request.body.email,
      password,
      name: request.body.email
    };

    registerUser(collection, user);

    response.status(Statuses.OK).send({});
  });
}
