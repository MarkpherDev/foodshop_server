import { Order, User } from '@prisma/client'
import { OrderBody, OrderUpdate } from '../types'

export interface OrderRepository {
	getAll(): Promise<Order[]>
	getByUser(userId: User['id']): Promise<Order[]>
	create(data: OrderBody): Promise<Order>
	update(id: Order['id'], data: OrderUpdate): Promise<Order>
	delete(id: Order['id']): Promise<string>
}
