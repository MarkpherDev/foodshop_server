import { Request, Response } from 'express'
import { errorMessage } from '../utils/handleError'
import productService from '../services/product.service'
import { CODE } from '../utils/constants'

export class ProductController {
	static createProduct = async (req: Request, res: Response) => {
		try {
			const { body } = req
			body.image = req.file
			const product = await productService.create(body)

			res
				.status(CODE.CREATED)
				.json({ data: product, message: 'Producto Creado Correctamente' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static getAllProducts = async (req: Request, res: Response) => {
		try {
			const products = await productService.getAll()

			res
				.status(CODE.OK)
				.json({ data: products, message: 'Productos Encontrados' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static getProductById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params

			const product = await productService.getById(Number(id))

			res
				.status(CODE.OK)
				.json({ data: product, message: 'Producto Encontrado Correctamente' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static getProductByName = async (req: Request, res: Response) => {
		try {
			const { name } = req.query
			const product = await productService.getByName(String(name))

			res
				.status(CODE.OK)
				.json({ data: product, message: 'Producto Encontrado Correctamente' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static updateProduct = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const { body } = req

			const updateProduct = await productService.update(Number(id), body)

			res
				.status(CODE.ACCEPTED)
				.json({ data: updateProduct, message: 'Actualizado Correctamente' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static deleteProduct = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const response = await productService.delete(Number(id))

			res.status(CODE.ACCEPTED).json({ message: response })
		} catch (error) {
			errorMessage(res, error)
		}
	}
}
