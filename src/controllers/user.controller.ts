import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {
	static getUsers = async (req: Request, res: Response): Promise<void> => {
		try {
			const response = await UserService.getUsers()

			res.status(200).json({
				data: response,
				message: 'Usuarios encontrados Satisfactoriamente'
			})
		} catch (error) {
			res.status(404).json({ message: (error as Error).message })
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
			res.status(401).json({ message: (error as Error).message })
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
			res.status(400).json({ message: (error as Error).message })
		}
	}
}
