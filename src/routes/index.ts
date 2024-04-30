import { Router } from 'express'
import userRouter from './user.router'
import productRouter from './product.router'

const router: Router = Router()

router.use('/users', userRouter)
router.use('/product', productRouter)

export default router
