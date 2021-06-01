import { Db, ObjectId } from "mongodb";

export interface IRepository<T> {
    create: (entity: any) => Promise<any>;
    findAll: () => Promise<T[]>;
    deleteById: (id: string) => Promise<void>;
    getById: (id: string) => Promise<T[]>;
    findBy: (criteria: any) => Promise<T[]>;
    findAllForUser: (userId: ObjectId) => Promise<T[]>;
    updateManyArray: (criteria: any, toPushIn: string ,entity: T) => Promise<void>;
    aggregate: (aggregation: any ) => Promise<any>;
}

export const mongoRepository = <T>(db: Db, collectionName: string): IRepository<T> => {

    const collection = db.collection(collectionName);

    const create = async(entity: T) => {
        collection.insertOne(entity);
    };

    const findAll = async(): Promise<T[]> => {
        return collection.find({}).toArray();
    };

    const deleteById = async(id: string): Promise<void> => {
        collection.deleteOne({ _id: new ObjectId(id) });
    };

    const getById = async(id: string): Promise<T[]> => {
      return collection.find({ _id: new ObjectId(id) }).toArray();
    };

    const findBy = async(criteria: any): Promise<T[]> => {
      return collection.find({...criteria}).toArray();
    };

    const findAllForUser = async (userId: ObjectId): Promise<T[]> => {
      return collection.find({ userId }).toArray();
    };

    const updateManyArray = async (criteria: any, toPushIn: string ,entity: T): Promise<void> => {
      console.log(criteria);
      console.log(toPushIn);
      console.log(entity);
      console.log(await collection.findOne({ userId: new ObjectId('60b6985dd46c650df0eae849') }));
      collection.updateMany({ ...criteria }, { $push: { [toPushIn]: entity } });
    };
    const aggregate = async (aggregation: any ): Promise<any> => {
      return collection.aggregate([
        {
          '$match': {
            'userId': new ObjectId('60b3f2c0ae329307380afd58'),
            'date': {
              '$gte': new Date('Tue, 01 Jun 2021 21:00:00 GMT'),
              '$lt': new Date('Thu, 01 Jul 2021 21:00:00 GMT')
            }
          }
        }, {
          '$addFields': {
            'expences': {
              'a': 1
            }
          }
        }
      ]);
    };

    return {
        create,
        findAll,
        deleteById,
        getById,
        findBy,
        findAllForUser,
        updateManyArray,
        aggregate
    }
};
