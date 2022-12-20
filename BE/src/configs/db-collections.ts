interface IDbCollections {
    [key: string]: { [key: string]: string };
}

export const dbCollections: IDbCollections = {
    transactions: {
        name: 'transactions',
    },
    users: {
        name: 'users',
    },
    categories: {
        schemaValidation: 'categories',
    },
};
