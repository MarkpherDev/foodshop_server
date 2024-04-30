import { Product } from '@prisma/client'
import { ProductRepository } from '../repository/product.repository'
import { ProductBody, ProductUpdate } from '../types'
import { handleCloudinary } from '../utils/imageUpload'
import { prisma } from '../config/prisma'
import { HttpException } from '../utils/HttpException'
import { CODE } from '../utils/constants'

class ProductService implements ProductRepository {
	async create(data: ProductBody): Promise<Product> {
		const imageUrl = await handleCloudinary(data.image)

		const newProduct: Product | null = await prisma.product.create({
			data: {
				name: data.name,
				description: data.description,
				category: data.category,
				price: parseFloat(String(data.price)),
				image: imageUrl.secure_url
			}
		})

		if (!newProduct) {
			throw new HttpException(CODE.NOT_MODIFIED, 'No se pudo crear el Producto')
		}

		return newProduct
	}
	async getAll(): Promise<Product[]> {
		const products: Product[] = await prisma.product.findMany()

		if (products.length === 0) {
			throw new HttpException(CODE.NOT_FOUND, 'No hay productos a mostrar')
		}

		return products
	}
	async getById(id: number): Promise<Product> {
		const product: Product | null = await prisma.product.findUnique({
			where: { id }
		})

		if (!product) {
			throw new HttpException(CODE.NOT_FOUND, 'El producto no existe')
		}

		return product
	}
	async getByName(name: string): Promise<Product[]> {
		const product: Product[] = await prisma.product.findMany({
			where: { name : {contains: name}}
		})

		if (product.length === 0) {
			throw new HttpException(
				CODE.NOT_FOUND,
				'Los elementos a buscar no existen'
			)
		}

		return product
	}
	async update(id: number, data: ProductUpdate): Promise<Product> {
		const exists = await this.getById(id)

		if (data.image) {
			const imageUrl = await handleCloudinary(data.image)

			const updatedProduct = await prisma.product.update({
				where: { id: exists.id },
				data: {
					name: data.name,
					description: data.description,
					category: data.category,
					price: parseFloat(String(data.price)),
					image: imageUrl.secure_url
				}
			})
			return updatedProduct
		}

		const updatedProduct = await prisma.product.update({
			where: { id: exists.id },
			data: {
				name: data.name,
				description: data.description,
				category: data.category,
				price: parseFloat(String(data.price))
			}
		})

		return updatedProduct
	}
	async delete(id: number): Promise<string> {
		const exists = await this.getById(id)

		const deletedProduct = await prisma.product.delete({
			where: { id: exists.id }
		})

		if (!deletedProduct) {
			throw new HttpException(
				CODE.NOT_MODIFIED,
				'El producto no se pudo eliminar'
			)
		}

		return 'Producto eliminado Satisfactoriamente'
	}
}

export default new ProductService()
