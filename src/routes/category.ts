import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller'
import { authenticate } from '../middleware/isLogged'

const router: Router = Router()

router.get('/', CategoryController.getCategories)
router.get('/:id', CategoryController.getCategoryById)
router.post('/', authenticate, CategoryController.createCategory)
router.put('/:id', authenticate, CategoryController.updateCategory)
router.delete('/:id', authenticate, CategoryController.deleteCategory)

export default router
