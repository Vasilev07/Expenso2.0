export const transactionExpensesAggregation = [
  {
    "$unwind": {
      "path": "$expenses"
    }
  }, {
    "$group": {
      "_id": "$expenses.category.categoryId",
      "amount": {
        "$sum": "$expenses.amount"
      },
      "name": {
        "$first": "$expenses.category.name"
      },
      "icon": {
        "$first": "$expenses.category.icon"
      },
      "date": {
        "$first": "$expenses.date"
      }
    }
  }, {
    "$set": {
      "isExpense": true
    }
  }
]
