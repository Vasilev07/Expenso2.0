import { ICategoryIcons } from "./category-create/category-icon-create/category-icons";

export interface ICategory {
    id?: string;
    name: string;
    color: string;
    icon: string;
    isExpense: boolean;
}
