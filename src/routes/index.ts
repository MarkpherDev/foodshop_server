import { Router } from 'express'
import userRouter from './user'
import categoryRouter from './category'
import productRouter from './product'

const router: Router = Router()

router.use('/users', userRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)

export default router
