import { query, Request, Response } from 'express'
import { CategoryService } from '../services/category.service'
import { errorMessage } from '../utils/handleError'

export class CategoryController {
	static getCategories = async (req: Request, res: Response) => {
		try {
			const response = await CategoryService.getCategories()

			res.status(200).json({
				data: response,
				message: 'Categorias encontradas Satisfactoriamente'
			})
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static getCategoryById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params

			const response = await CategoryService.getCategoryById(Number(id))

			res.status(200).json({ data: response, message: 'Producto Encontrado' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static createCategory = async (req: Request, res: Response) => {
		try {
			const { body } = req
			const response = await CategoryService.createCategory(body)

			res
				.status(201)
				.json({ data: response, message: 'Categoria creada Correctamente' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static updateCategory = async (req: Request, res: Response) => {
		try {
			const { body } = req
			const { id } = req.params

			const response = await CategoryService.updateCategory(Number(id), body)

			res.status(202).json({
				data: response,
				message: 'Categoria Actualizada Correctamente'
			})
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static deleteCategory = async (req: Request, res: Response) => {
		try {
			const { id } = req.params

			const response = await CategoryService.deleteCategory(Number(id))

			res.status(202).json({ message: response })
		} catch (error) {
			errorMessage(res, error)
		}
	}
}
