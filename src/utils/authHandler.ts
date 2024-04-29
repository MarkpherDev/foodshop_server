import { compare, genSalt, hash } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { AuthPayload } from '../types'
import { JWT_SECRET } from './constants'

export const hashPassword = async (password: string) => {
	const salt = await genSalt(10)
	const hashPass = await hash(password, salt)

	return hashPass
}

export const comparePassword = async (
	password: string,
	hashPassword: string
) => {
	const isPassword = await compare(password, hashPassword)
	return isPassword
}

export const generateJWT = (payload: AuthPayload) => {
	const token = sign(payload, JWT_SECRET, { expiresIn: '1d' })

	return token
}

export const verifyToken = (token: string) => {
	const decoded = verify(token, JWT_SECRET)

	return decoded
}
