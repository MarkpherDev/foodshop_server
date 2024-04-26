import { prisma } from '../config/prisma'
import { PedidoId, ProductId, UserId } from '../types'
import { CODE } from '../utils/constants'
import { HttpException } from '../utils/HttpException'
import { ProductService } from './product.service'
import { UserService } from './user.service'

export class PedidoService {
	static getPedidos = async () => {
		const pedidos = await prisma.pedido.findMany({
			include: {
				product: {
					select: {
						name: true,
						description: true,
						precio: true
					}
				},
				user: {
					select: {
						first_name: true,
						last_name: true,
						email: true
					}
				}
			}
		})

		if (!pedidos) {
			throw new HttpException(CODE.NOT_FOUND, 'No hay pedidos que mostrar')
		}

		return pedidos
	}

	static createPedido = async (
		userId: UserId,
		productId: ProductId,
		cantidad: number
	) => {
		const userFind = await UserService.getUserById(userId)

		const productFind = await ProductService.getProductById(productId)

		const pedido = await prisma.pedido.create({
			data: {
				userId: userFind.id,
				productId: productFind.id,
				cantidad
			},
			include: {
				product: {
					select: {
						name: true,
						description: true,
						precio: true
					}
				},
				user: {
					select: {
						first_name: true,
						last_name: true,
						email: true
					}
				}
			}
		})

		if (!pedido) {
			throw new HttpException(CODE.BAD_REQUEST, 'No se pudo crear el pedido')
		}

		return pedido
	}

	static getPedidoById = async (id: PedidoId) => {
		const pedidoFind = await prisma.pedido.findUnique({ where: { id } })

		if (!pedidoFind) {
			throw new HttpException(CODE.NOT_FOUND, 'No existe el pedido')
		}

		return pedidoFind
	}

	static deletePedido = async (id: PedidoId) => {
		const pedidoFind = await this.getPedidoById(id)

		await prisma.pedido.delete({
			where: {
				id: pedidoFind.id
			}
		})

		return 'Pedido Eliminado Correctamente'
	}
}
