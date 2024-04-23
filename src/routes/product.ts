import { Router } from 'express'
import upload from '../middleware/handleMulter'
import { ProductController } from '../controllers/product.controller'

const router: Router = Router()

router.post('/', upload.single('image'), ProductController.createProduct)

export default router
