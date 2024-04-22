import { compare, genSalt, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from './constants'
import { Payload } from '../types'

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

export const generateJWT = (payload: Payload) => {
	const token = sign(payload, JWT_SECRET, { expiresIn: '1d' })

	return token
}
