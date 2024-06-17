import { Category } from '../models/category.model';

export class CategoryService {
    static async createCategory(categoryName: string) {
        return Category.create({ categoryName });
    }

    static async getCategories() {
        return Category.find();
    }
}