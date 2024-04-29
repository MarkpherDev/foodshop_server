import { Router } from 'express'
import { body } from 'express-validator'
import { UserController } from '../controllers/user.controller'
import { HandleInputErrors } from '../middleware/validation'

const router: Router = Router()

router.post(
	'/register',
	body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
	body('lastname').notEmpty().withMessage('Los apellidos no pueden ir vacío'),
	body('email').isEmail().withMessage('Email no válido'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('El password es muy corto, mínimo de 8 caracteres'),
	HandleInputErrors,
	UserController.register
)
router.post(
	'/login',
	body('email').isEmail().withMessage('Email no válido'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('El password es muy corto, mínimo de 8 caracteres'),
	HandleInputErrors,
	UserController.login
)

export default router
