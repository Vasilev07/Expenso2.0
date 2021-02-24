interface IDbCollections {
    [key: string]: { [key: string]: string };
}

export const dbCollections: IDbCollections = {
    expenses: {
        name: 'expenses',
    },
    income: {
        name: 'income',
    },
    categories: {
        schemaValidation: 'category'
    }
};
