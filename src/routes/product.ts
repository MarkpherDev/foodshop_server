import { Router } from 'express'
import upload from '../middleware/handleMulter'
import { ProductController } from '../controllers/product.controller'
import { authenticate } from '../middleware/isLogged'

const router: Router = Router()

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.post(
	'/',
	authenticate,
	upload.single('image'),
	ProductController.createProduct
)
router.put(
	'/:id',
	authenticate,
	upload.single('image'),
	ProductController.updateProduct
)
router.delete('/:id', authenticate, ProductController.deleteProduct)

export default router
