import { Router } from 'express'
import userRouter from './user'
import categoryRouter from './category'

const router: Router = Router()

router.use('/users', userRouter)
router.use('/category', categoryRouter)

export default router
