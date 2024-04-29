import { Request, Response } from 'express'
import { errorMessage } from '../utils/handleError'
import userService from '../services/user.service'
import { CODE } from '../utils/constants'

export class UserController {
	static register = async (req: Request, res: Response) => {
		try {
			const { body } = req
			const response = await userService.create(body)

			res
				.status(CODE.CREATED)
				.json({ data: response, message: 'Usuario creado Correctamente' })
		} catch (error) {
			errorMessage(res, error)
		}
	}
	static login = async (req: Request, res: Response) => {
		try {
			const { body } = req

			const response = await userService.login(body)

			res
				.status(CODE.ACCEPTED)
				.json({ data: response, message: 'Logeado Correctamente' })
		} catch (error) {
			errorMessage(res, error)
		}
	}
}
