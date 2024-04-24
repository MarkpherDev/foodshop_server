import { prisma } from '../config/prisma'
import { CreateProductBody, ProductId, UpdateProductBody } from '../types'
import { CODE } from '../utils/constants'
import { HttpException } from '../utils/HttpException'
import { handleCloudinary } from '../utils/imageUpload'
import { CategoryService } from './category.service'

export class ProductService {
	static getProducts = async () => {
		const products = await prisma.product.findMany({
			include: { category: true }
		})

		if (!products) {
			throw new HttpException(
				CODE.NOT_FOUND,
				'No se pudo encontrar los productos'
			)
		}

		return products
	}

	static createProduct = async (data: CreateProductBody) => {
		const categoryFind = await CategoryService.getCategoryById(
			Number(data.categoryId)
		)

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

	static getProductById = async (id: ProductId) => {
		const productFind = await prisma.product.findUnique({
			where: { id },
			include: { category: true }
		})

		if (!productFind) {
			throw new HttpException(CODE.NOT_FOUND, 'No existe el producto')
		}

		return productFind
	}

	static updateProduct = async (id: ProductId, data: UpdateProductBody) => {
		const productFind = await this.getProductById(id)

		if (data.image) {
			const imageUrl = await handleCloudinary(data.image)

			const updatedProduct = await prisma.product.update({
				data: {
					name: data.name,
					description: data.description,
					precio: data.precio,
					image: imageUrl,
					status: data.status,
					categoryId: data.categoryId
				},
				where: { id: productFind.id },
				include: { category: true }
			})

			if (!updatedProduct) {
				throw new HttpException(
					CODE.BAD_REQUEST,
					'El producto no se pudo actualizar'
				)
			}

			return updatedProduct
		}

		const updatedProduct = await prisma.product.update({
			data: {
				name: data.name,
				description: data.description,
				precio: data.precio,
				image: productFind.image,
				status: data.status,
				categoryId: data.categoryId
			},
			where: { id: productFind.id },
			include: { category: true }
		})

		if (!updatedProduct) {
			throw new HttpException(
				CODE.BAD_REQUEST,
				'El producto no se pudo actualizar'
			)
		}

		return updatedProduct
	}

	static deleteProduct = async (id: ProductId) => {
		const productFind = await this.getProductById(id)

		const deletedProduct = await prisma.product.delete({
			where: { id: productFind.id }
		})

		if (!deletedProduct) {
			throw new HttpException(
				CODE.BAD_REQUEST,
				'No se pudo eliminar el producto'
			)
		}

		return 'Producto Eliminado Correctamente'
	}
}
