import { prisma } from '../config/prisma'
import {
	CategoryBody,
	CategoryId,
	CategoryResponse,
	CategoryUpdateBody
} from '../types'
import { CODE } from '../utils/constants'
import { HttpException } from '../utils/HttpException'

export class CategoryService {
	static getCategories = async (): Promise<CategoryResponse[]> => {
		const categories = await prisma.category.findMany({
			select: { id: true, name: true, description: true }
		})

		if (!categories) {
			throw new HttpException(
				CODE.NOT_FOUND,
				'No se pudieron encontrar las categorias'
			)
		}

		return categories
	}

	static createCategory = async (
		data: CategoryBody
	): Promise<CategoryResponse> => {
		const category = await prisma.category.create({
			data,
			select: { id: true, name: true, description: true }
		})

		if (!category) {
			throw new HttpException(CODE.BAD_REQUEST, 'No se pudo crear el producto')
		}

		return category
	}

	static getCategoryById = async (
		id: CategoryId
	): Promise<CategoryResponse> => {
		const category = await prisma.category.findUnique({
			where: { id },
			select: { id: true, name: true, description: true }
		})

		if (!category) {
			throw new HttpException(CODE.NOT_FOUND, 'El Producto no existe')
		}

		return category
	}

	static updateCategory = async (
		id: CategoryId,
		data: CategoryUpdateBody
	): Promise<CategoryResponse> => {
		const categoryFind = await this.getCategoryById(id)

		if (!categoryFind) {
			throw new HttpException(CODE.NOT_FOUND, 'La categoria no existe')
		}

		const updatedCategory = await prisma.category.update({
			where: { id: categoryFind.id },
			data,
			select: { id: true, name: true, description: true }
		})

		if (!updatedCategory) {
			throw new HttpException(
				CODE.BAD_REQUEST,
				'No se pudo Actualizar la categoria'
			)
		}

		return updatedCategory
	}

	static deleteCategory = async (id: CategoryId): Promise<string> => {
		const category = await this.getCategoryById(id)

		await prisma.category.delete({
			where: { id: category.id }
		})

		return 'Producto Eliminado'
	}
}
