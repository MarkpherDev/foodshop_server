import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { body, param, query } from 'express-validator'
import { HandleInputErrors } from '../middleware/validation'
import upload from '../middleware/handleMulter'

const router: Router = Router()

router.get('/', ProductController.getAllProducts)

router.get(
	'/search',
	query('name').isString().withMessage('El name debe ser un string'),
	HandleInputErrors,
	ProductController.getProductByName
)

router.post(
	'/',
	upload.single('image'),
	body('name')
		.isString()
		.isLength({ min: 5 })
		.withMessage('El name es obligatorio'),
	body('description')
		.isString()
		.isLength({ min: 5, max: 100 })
		.withMessage('La descripcion no puede ir vacío'),
	body('category')
		.isIn(['comida', 'bebida', 'combo', 'otros'])
		.default('comida'),
	body('price')
		.isFloat({ min: 1, max: 150 })
		.withMessage('El precio no puede ir vacío'),
	HandleInputErrors,
	ProductController.createProduct
)

router.put(
	'/:id',
	param('id').isInt().withMessage('el id debe ser un numero'),
	upload.single('image'),
	body('name')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage('El name es obligatorio'),
	body('description')
		.optional()
		.isString()
		.isLength({ min: 5, max: 100 })
		.withMessage('La descripcion no puede ir vacío'),
	body('category')
		.optional()
		.isIn(['comida', 'bebida', 'combo', 'otros'])
		.default('comida'),
	body('price')
		.optional()
		.isFloat({ min: 1, max: 150 })
		.withMessage('El precio no puede ir vacío'),
	HandleInputErrors,
	ProductController.updateProduct
)

router.get(
	'/:id',
	param('id').isInt().withMessage('el id debe ser un numero'),
	HandleInputErrors,
	ProductController.getProductById
)

router.delete(
	'/:id',
	param('id').isInt().withMessage('el id debe ser un numero'),
	HandleInputErrors,
	ProductController.deleteProduct
)

export default router
