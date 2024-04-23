import { Request, Response } from 'express'
import { errorMessage } from '../utils/handleError'
import { ProductService } from '../services/product.service'
import { CreateProductBody } from '../types'

export class ProductController {
	static createProduct = async (req: Request, res: Response) => {
		try {
			const body = req.body
			const file = req.file

			const data: CreateProductBody = {
				name: body.name,
				description: body.description,
				precio: body.precio,
				categoryId: Number(body.categoryId),
				image: file!
			}

			const response = await ProductService.createProduct(data)

			res
				.status(201)
				.json({ data: response, message: 'Producto Creado Correctamente' })
		} catch (error) {
			errorMessage(res, error)
		}
	}
}
