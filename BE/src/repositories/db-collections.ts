interface IDbCollections {
    [key: string]: { name: string };
}

export const dbCollections: IDbCollections = {
    expenses: {
        name: 'expenses'
    },
    income: {
        name: 'expenses'
    }
}