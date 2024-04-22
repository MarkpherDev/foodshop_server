import { Request, Response } from 'express'
import { CategoryService } from '../services/category.service'

export class CategoryController {
	static getCategories = async (req: Request, res: Response) => {
		try {
			const response = await CategoryService.getCategories()

			res.status(200).json({
				data: response,
				message: 'Categorias encontradas Satisfactoriamente'
			})
		} catch (error) {
			res.status(404).json({ message: (error as Error).message })
		}
	}
}
