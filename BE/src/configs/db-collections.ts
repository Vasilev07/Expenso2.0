interface IDbCollections {
    [key: string]: { [key: string]: string };
}

export const dbCollections: IDbCollections = {
    transactions: {
        name: 'transactions',
    },
    categories: {
        schemaValidation: 'category'
    }
};
