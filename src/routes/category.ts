import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller'

const router: Router = Router()

router.get('/', CategoryController.getCategories)
router.post('/', CategoryController.createCategory)
router.put('/:id', CategoryController.updateCategory)
router.get('/:id', CategoryController.getCategoryById)
router.delete('/:id', CategoryController.deleteCategory)

export default router
