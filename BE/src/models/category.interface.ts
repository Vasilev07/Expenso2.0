import { ObjectId } from 'mongodb';

export interface ICategory {
    id?: string;
    name: string;
    color: string;
    icon: string;
    userId: ObjectId;
    isExpense: boolean;
}
