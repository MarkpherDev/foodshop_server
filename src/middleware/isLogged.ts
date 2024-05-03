import { Request, Response, NextFunction } from 'express'
import { User } from '@prisma/client'
import { HttpException } from '../utils/HttpException'
import { CODE } from '../utils/constants'
import { verifyToken } from '../utils/authHandler'
import { errorMessage } from '../utils/handleError'
import UserService from '../services/user.service'
import { TokenExpiredError } from 'jsonwebtoken'

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

		if (!token) {
			throw new HttpException(
				CODE.UNAUTHORIZED_ACCESS,
				'No se ha proporcionado un token'
			)
		}

		const decoded = verifyToken(token!)

		if (typeof decoded === 'object' && decoded.id) {
			const user = await UserService.getByEmail(decoded.email)
			if (user) {
				req.user = user
				next()
			} else {
				throw new HttpException(CODE.BAD_REQUEST, 'Token no valido')
			}
		}
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			if (error instanceof TokenExpiredError) {
				res.status(CODE.BAD_REQUEST).json({ message: 'Token expirado' })
			}
		} else {
			errorMessage(res, error)
		}
	}
}
