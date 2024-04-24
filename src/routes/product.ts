import { Router } from 'express'
import upload from '../middleware/handleMulter'
import { ProductController } from '../controllers/product.controller'

const router: Router = Router()

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.post('/', upload.single('image'), ProductController.createProduct)
router.put('/:id', upload.single('image'), ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

export default router
