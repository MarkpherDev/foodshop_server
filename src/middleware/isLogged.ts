import { Request, Response, NextFunction } from 'express'
import { User } from '@prisma/client'
import { HttpException } from '../utils/HttpException'
import { CODE } from '../utils/constants'
import { verifyToken } from '../utils/authHandler'
import { errorMessage } from '../utils/handleError'
import { UserService } from '../services/user.service'

declare global {
	namespace Express {
		interface Request {
			user?: User
		}
	}
}

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bearer = req.headers.authorization

		if (!bearer) {
			throw new HttpException(CODE.UNAUTHORIZED_ACCESS, 'No autorizado')
		}

		const [, token] = bearer.split(' ')

		const decoded = verifyToken(token!)

		if (typeof decoded === 'object' && decoded.id) {
			const user = await UserService.getUserById(decoded.id)

			if (user) {
				req.user = user
				next()
			} else {
				throw new HttpException(CODE.BAD_REQUEST, 'Token no valido')
			}
		}
	} catch (error) {
		errorMessage(res, error)
	}
}
