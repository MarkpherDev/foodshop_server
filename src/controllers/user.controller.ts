import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { HttpException } from '../utils/HttpException'
import { errorMessage } from '../utils/handleError'

export class UserController {
	static getUsers = async (req: Request, res: Response): Promise<void> => {
		try {
			const response = await UserService.getUsers()

			res.status(200).json({
				data: response,
				message: 'Usuarios encontrados Satisfactoriamente'
			})
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static register = async (req: Request, res: Response): Promise<void> => {
		try {
			const response = await UserService.createUser(req.body)

			res.status(201).json({
				message: 'Usuario Creado Satisfactoriamente',
				data: response.user,
				token: response.token
			})
		} catch (error) {
			errorMessage(res, error)
		}
	}

	static login = async (req: Request, res: Response): Promise<void> => {
		try {
			const response = await UserService.login(req.body)
			res.status(200).json({
				message: 'Logeado correctamente',
				data: response.user,
				token: response.token
			})
		} catch (error) {
			errorMessage(res, error)
		}
	}
}
