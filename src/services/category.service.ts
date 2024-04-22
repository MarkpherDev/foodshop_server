import { prisma } from '../config/prisma'
import { CategoryResponse } from '../types'

export class CategoryService {
	static getCategories = async (): Promise<CategoryResponse[]> => {
		const categories = await prisma.productCategory.findMany({
			select: { id: true, name: true, description: true }
		})

		if (!categories) throw new Error('No se pudieron encontrar las categorias')

		return categories
	}
}
