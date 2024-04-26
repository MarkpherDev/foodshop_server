import { Router } from 'express'
import { PedidoController } from '../controllers/pedido.controller'
import { authenticate } from '../middleware/isLogged'

const router: Router = Router()

router.get('/', authenticate, PedidoController.getPedidos)
router.get('/:id', authenticate, PedidoController.getPedidoById)
router.post('/', authenticate, PedidoController.createPedido)
router.delete('/:id', authenticate, PedidoController.deletePedido)

export default router
