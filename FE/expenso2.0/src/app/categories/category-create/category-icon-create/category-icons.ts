export interface ICategoryIcons {
  isExpense: boolean;
  name: string;
}

export const categoryIcons: ICategoryIcons[] = [
  {
    isExpense: true,
    name: 'airplane-outline'
  },
  {
    isExpense: true,
    name: 'american-football-outline'
  },
  {
    isExpense: true,
    name: 'bicycle-outline'
  },
  {
    isExpense: true,
    name: 'fast-food-outline'
  },
  {
    isExpense: true,
    name: 'hammer-outline'
  },
  {
    isExpense: true,
    name: 'paw-outline'
  },
  {
    isExpense: true,
    name: 'school-outline'
  },
  {
    isExpense: false,
    name: 'cash-outline'
  },
  {
    isExpense: false,
    name: 'card-outline'
  },
  {
    isExpense: false,
    name: 'wallet-outline'
  }
]
