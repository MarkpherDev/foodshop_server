import { Order, OrderDetails } from '@prisma/client'
import { OrderRepository } from '../repository/order.repository'
import { OrderBody, OrderUpdate } from '../types'
import productService from './product.service'
import { prisma } from '../config/prisma'
import { HttpException } from '../utils/HttpException'
import { CODE } from '../utils/constants'

class OrderService implements OrderRepository {
	async getAll(): Promise<Order[]> {
		const orders: Order[] = await prisma.order.findMany()

		if (orders.length === 0) {
			throw new HttpException(CODE.OK, 'No hay ordenes a mostrar')
		}

		return orders
	}
	async getByUser(userId: string): Promise<Order[]> {
		const orders: Order[] = await prisma.order.findMany({
			where: { userId },
			include: { OrderProducts: true }
		})

		if (orders.length === 0) {
			throw new HttpException(CODE.OK, 'No hay ordenes a mostrar')
		}

		return orders
	}
	async create(data: OrderBody): Promise<Order> {
		const productExists = await productService.getById(data.productId)

		const existingOrder = await prisma.order.findFirst({
			where: {
				userId: data.userId,
				state: {
					notIn: ['pagado']
				}
			}
		})

		let order: Order

		if (!existingOrder) {
			order = await prisma.order.create({
				data: {
					userId: data.userId,
					OrderProducts: {
						create: {
							productId: data.productId,
							quantity: data.quantity,
							unit_price: productExists.price,
							subtotal: data.quantity * productExists.price
						}
					}
				}
			})
			const orderDetails: OrderDetails[] = await prisma.orderDetails.findMany({
				where: {
					orderId: order.id
				},
				include: {
					product: true
				}
			})

			const total = orderDetails.reduce(
				(acc, detail) => acc + detail.subtotal,
				0
			)

			const orderUpdate: Order = await prisma.order.update({
				where: {
					id: order.id
				},
				data: {
					total
				}
			})

			return orderUpdate
		} else {
			const productDetailExists = await prisma.orderDetails.findFirst({
				where: { productId: data.productId }
			})

			if (!productDetailExists) {
				await prisma.orderDetails.create({
					data: {
						orderId: existingOrder.id,
						productId: data.productId,
						quantity: data.quantity,
						unit_price: productExists.price,
						subtotal: data.quantity * productExists.price
					}
				})
			} else {
				await prisma.orderDetails.update({
					where: { id: productDetailExists?.id },
					data: {
						quantity: data.quantity,
						subtotal: data.quantity * productExists.price
					}
				})
			}

			const orderDetails: OrderDetails[] = await prisma.orderDetails.findMany({
				where: {
					orderId: existingOrder.id
				},
				include: {
					product: true
				}
			})

			const total = orderDetails.reduce(
				(acc, detail) => acc + detail.subtotal,
				0
			)

			const orderUpdate: Order = await prisma.order.update({
				where: {
					id: existingOrder.id
				},
				data: {
					total
				}
			})

			return orderUpdate
		}
	}
	async update(id: number, data: OrderUpdate): Promise<Order> {
		const order: Order | null = await prisma.order.findUnique({
			where: { id }
		})

		if (!order) {
			throw new HttpException(CODE.NOT_FOUND, 'No existe la orden')
		}

		const orderUpdate: Order = await prisma.order.update({
			where: { id: order.id },
			data
		})

		return orderUpdate
	}
	async delete(id: number): Promise<string> {
		const order: Order | null = await prisma.order.findUnique({
			where: { id }
		})

		if (!order) {
			throw new HttpException(CODE.NOT_FOUND, 'No existe la orden')
		}

		await prisma.order.delete({ where: { id: order.id } })

		return 'Orden Eliminada'
	}
}

export default new OrderService()
