import { Router } from 'express'
import { OrderController } from '../controllers/order.controller'
import { authenticate } from '../middleware/isLogged'

const router: Router = Router()

router.post('/', authenticate, OrderController.createOrder)
router.get('/', authenticate, OrderController.getAllOrders)
router.get('/all', authenticate, OrderController.getByUser)
router.put('/:id', authenticate, OrderController.updateStatus)
router.delete('/', authenticate, OrderController.deleteOrder)

export default router
