export const transactionSpendingsAggregation = (date: string) => [
    {
        $match: {
            date,
        },
    }, {
        $set: {
            balance: {
                $subtract: [
                    {
                        $sum: '$incomes.amount',
                    }, {
                        $sum: '$expenses.amount',
                    },
                ],
            },
            totalIncomes: {
                $sum: '$incomes.amount',
            },
        },
    }, {
        $unwind: {
            path: '$expenses',
        },
    }, {
        $group: {
            _id: '$expenses.category.categoryId',
            expenses: {
                $sum: '$expenses.amount',
            },
            name: {
                $first: '$expenses.category.name',
            },
            icon: {
                $first: '$expenses.category.icon',
            },
            date: {
                $first: '$expenses.date',
            },
            balance: {
                $first: '$balance',
            },
            color: {
                $first: '$expenses.category.color',
            },
            totalIncomes: {
                $first: '$totalIncomes',
            },
        },
    }, {
        $project: {
            expenses: 1,
            name: 1,
            icon: 1,
            date: 1,
            balance: 1,
            color: 1,
            incomes: 1,
            totalIncomes: 1,
            expencePercent: {
                $multiply: [
                    {
                        $divide: [
                            '$expenses', '$totalIncomes',
                        ],
                    }, 100,
                ],
            },
        },
    }, {
        $sort: {
            expenses: -1,
        },
    },
];

export const transactionSpendingsAggregationPerYear = (year: number) => [
    {
        $match: {
            date: {
                $regex: year.toString(),
            },
        },
    }, {
        $set: {
            balance: {
                $subtract: [
                    {
                        $sum: '$incomes.amount',
                    }, {
                        $sum: '$expenses.amount',
                    },
                ],
            },
            totalIncomes: {
                $sum: '$incomes.amount',
            },
        },
    }, {
        $group: {
            _id: '',
            userId: {
                $first: '$userId',
            },
            date: {
                $first: '$date',
            },
            incomes: {
                $first: '$incomes',
            },
            expenses: {
                $first: '$expenses',
            },
            balance: {
                $sum: '$balance',
            },
            totalIncomes: {
                $sum: '$totalIncomes',
            },
        },
    }, {
        $unwind: {
            path: '$expenses',
        },
    }, {
        $group: {
            _id: '$expenses.category.categoryId',
            expenses: {
                $sum: '$expenses.amount',
            },
            name: {
                $first: '$expenses.category.name',
            },
            icon: {
                $first: '$expenses.category.icon',
            },
            date: {
                $first: '$expenses.date',
            },
            balance: {
                $first: '$balance',
            },
            color: {
                $first: '$expenses.category.color',
            },
            totalIncomes: {
                $first: '$totalIncomes',
            },
        },
    }, {
        $project: {
            expenses: 1,
            name: 1,
            icon: 1,
            date: 1,
            balance: 1,
            color: 1,
            incomes: 1,
            totalIncomes: 1,
            expencePercent: {
                $multiply: [
                    {
                        $divide: [
                            '$expenses', '$totalIncomes',
                        ],
                    }, 100,
                ],
            },
        },
    }, {
        $sort: {
            expenses: -1,
        },
    },
];
