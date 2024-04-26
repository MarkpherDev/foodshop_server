import { Request, Response } from 'express'
import { errorMessage } from '../utils/handleError'
import { PedidoService } from '../services/pedido.service'

export class PedidoController {
	static getPedidos = async (req: Request, res: Response) => {
		try {
			const response = await PedidoService.getPedidos()

			res.status(200).json({
				data: response,
				message: 'Pedidos encontrados correctamente'
			})
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static getPedidoById = async (req: Request, res: Response) => {
		try {
			const id = Number(req.params.id)
			const response = await PedidoService.getPedidoById(id)

			res.status(200).json({ message: response })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static createPedido = async (req: Request, res: Response) => {
		try {
			const userId = req.user!.id
			const productId = req.body.productId
			const cantidad = req.body.cantidad

			const response = await PedidoService.createPedido(
				userId,
				productId,
				cantidad
			)

			res
				.status(201)
				.json({ data: response, message: 'Pedido Creado Correctamente' })
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static deletePedido = async (req: Request, res: Response) => {
		try {
			const id = Number(req.params.id)

			const response = await PedidoService.deletePedido(id)

			res.status(200).json({ message: response })
		} catch (error) {
			errorMessage(res, error)
		}
	}
}
