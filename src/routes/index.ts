import { Router } from 'express'
import userRouter from './user'
import categoryRouter from './category'
import productRouter from './product'
import pedidosRouter from './pedido'

const router: Router = Router()

router.use('/users', userRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/pedidos', pedidosRouter)

export default router
