import { prisma } from '../config/prisma'
import { CreateProduct, CreateProductBody } from '../types'
import { CODE } from '../utils/constants'
import { HttpException } from '../utils/HttpException'
import { handleCloudinary } from '../utils/imageUpload'
import { CategoryService } from './category.service'

export class ProductService {
	static createProduct = async (
		data: CreateProductBody
	): Promise<CreateProduct> => {
		const categoryFind = await CategoryService.getCategoryById(data.categoryId)

		const cloudUrl = await handleCloudinary(data.image)

		const product = await prisma.product.create({
			data: {
				name: data.name,
				description: data.description,
				precio: data.precio,
				image: cloudUrl,
				categoryId: categoryFind.id
			},
			include: {
				category: true
			}
		})

		if (!product) {
			throw new HttpException(CODE.BAD_REQUEST, 'No se pudo crear el Producto')
		}

		return product
	}
}
