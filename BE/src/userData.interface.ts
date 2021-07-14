import { Request } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
    userData: any // or any other type
}
