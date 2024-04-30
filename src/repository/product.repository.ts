import { Product } from '@prisma/client'
import { ProductBody, ProductUpdate } from '../types'

export interface ProductRepository {
	create(data: ProductBody): Promise<Product>
	getAll(): Promise<Product[]>
	getById(id: Product['id']): Promise<Product>
	getByName(name: Product['name']): Promise<Product[]>
	update(id: Product['id'], data: ProductUpdate): Promise<Product>
	delete(id: Product['id']): Promise<string>
}
