import { Request, Response } from 'express'
import { errorMessage } from '../utils/handleError'
import { ProductService } from '../services/product.service'

export class ProductController {
	static getProducts = async (req: Request, res: Response) => {
		try {
			const response = await ProductService.getProducts()

			res.status(200).json({
				data: response,
				message: 'Productos encontrados Correctamente'
			})
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static getProductById = async (req: Request, res: Response) => {
		try {
			const id = Number(req.params.id)

			const response = await ProductService.getProductById(id)

			res
				.status(200)
				.json({ data: response, message: 'Producto Encontrado Correctamente' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static createProduct = async (req: Request, res: Response) => {
		try {
			const body = req.body
			const file = req.file

			body.image = file

			const response = await ProductService.createProduct(body)

			res
				.status(201)
				.json({ data: response, message: 'Producto Creado Correctamente' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static updateProduct = async (req: Request, res: Response) => {
		try {
			const id = Number(req.params.id)
			const body = req.body

			const response = await ProductService.updateProduct(id, body)

			res.status(200).json({ data: response, message: 'Producto actualizado' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static deleteProduct = async (req: Request, res: Response) => {
		try {
			const id = Number(req.params.id)

			const response = await ProductService.deleteProduct(id)

			res.status(200).json({ message: response })
		} catch (error) {
			errorMessage(res, error)
		}
	}
}
