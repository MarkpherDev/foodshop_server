import { HttpException } from './HttpException'
import { Response } from 'express'

export const errorMessage = (res: Response, error: unknown): void => {
	if (error instanceof HttpException) {
		res.status(error.status).json({ message: error.message })
	} else {
		res.status(500).json({ message: 'Hubo un error' })
	}
}
