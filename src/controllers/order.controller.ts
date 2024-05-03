import orderService from '../services/order.service'
import { CODE } from '../utils/constants'
import { errorMessage } from '../utils/handleError'
import { Request, Response } from 'express'

export class OrderController {
	static createOrder = async (req: Request, res: Response) => {
		try {
			const { body } = req
			body.userId = req.user!.id
			const order = await orderService.create(body)

			res
				.status(CODE.CREATED)
				.json({ data: order, message: 'Order Creada Satisfactoriamente' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static getAllOrders = async (req: Request, res: Response) => {
		try {
			const response = await orderService.getAll()

			res
				.status(CODE.OK)
				.json({ data: response, message: 'Ordenes Encontradas' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static getByUser = async (req: Request, res: Response) => {
		try {
			const userId = req.user!.id

			const orders = await orderService.getByUser(userId)

			res
				.status(CODE.ACCEPTED)
				.json({ data: orders, message: `${orders.length} Ordenes encontradas` })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static updateStatus = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const { body } = req
			const updateOrder = await orderService.update(Number(id), body)

			res
				.status(CODE.ACCEPTED)
				.json({ data: updateOrder, message: 'Order Actualizada' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static deleteOrder = async (req: Request, res: Response) => {
		try {
			const { id } = req.params

			const deletedOrder = await orderService.delete(Number(id))

			res.status(CODE.ACCEPTED).json({ message: deletedOrder })
		} catch (error) {
			errorMessage(res, error)
		}
	}
}
