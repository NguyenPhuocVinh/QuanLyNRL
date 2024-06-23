import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoryService } from '../services/category.service';
import { ApiError } from '../utils/api-error.util';

export class CategoryController {
    static async createCategory(req: Request, res: Response) {
        try {
            const { categoryName } = req.body;
            if (!categoryName) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Category name is required');
            }
    
            const category = await CategoryService.createCategory(categoryName);
            res.status(StatusCodes.CREATED).json({category});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    static async getCategories(req: Request, res: Response) {
        const categories = await CategoryService.getCategories();
        res.status(StatusCodes.OK).json({categories});
    }
}
