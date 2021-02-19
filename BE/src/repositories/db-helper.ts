import { Db } from "mongodb";
import { dbCollections } from "./db-collections";


export const initizalizeCollections = async(db: Db) => {
    const collectionsToCreate = Object.entries(dbCollections);
    
    db.listCollections().toArray((err, info) => {
        collectionsToCreate.forEach(([collectionName, ...rest]) => {
            if (!info.some((data) => data.name === collectionName)) {
                db.createCollection(collectionName);
                console.log(`Collection ${collectionName} created`);
            }                
        });
    });
};
