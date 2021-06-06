export const transactionSpendingsAggregation = [
  {
    '$set': {
      'balance': {
        '$subtract': [
          {
            '$sum': '$incomes.amount'
          }, {
            '$sum': '$expenses.amount'
          }
        ]
      }
    }
  }, {
    '$unwind': {
      'path': '$expenses'
    }
  }, {
    '$unwind': {
      'path': '$incomes'
    }
  }, {
    '$group': {
      '_id': '$expenses.category.categoryId',
      'expenses': {
        '$sum': '$expenses.amount'
      },
      'name': {
        '$first': '$expenses.category.name'
      },
      'icon': {
        '$first': '$expenses.category.icon'
      },
      'date': {
        '$first': '$expenses.date'
      },
      'balance': {
        '$first': '$balance'
      }
    }
  }, {
    '$sort': {
      'expenses': -1
    }
  }
];